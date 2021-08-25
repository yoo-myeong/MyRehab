const URL = "/static/model/";
let model, webcam, ctx, labelContainer, maxPredictions;

// part와 step 가져오기
part_h1 = document.querySelector('.part')
part = part_h1.innerText
step_h1 = document.querySelector('.step')
step = step_h1.innerText

// circle innerText 선택
circle = document.querySelector('.dot-circle')
circle_text = circle.innerText

async function init() {
    start_button = document.querySelector('.start_button')
    start_button.classList.add('hidden')

    const modelURL = URL + part + "/model.json";
    const metadataURL = URL + part + "/metadata.json";

    model = await tmPose.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    const size = 400;
    const flip = true;
    webcam = new tmPose.Webcam(size, size, flip);
    await webcam.setup();
    await webcam.play();
    window.requestAnimationFrame(loop);

    const canvas = document.getElementById("canvas");
    canvas.width = size; canvas.height = size;
    ctx = canvas.getContext("2d");
}

async function loop(timestamp) {
    webcam.update();
    await predict();
    window.requestAnimationFrame(loop);
}
let status = "down"
let cnt = 0

function countUp(){
    cnt ++;
    console.log(cnt)
}

async function predict() {
    const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
    const prediction = await model.predict(posenetOutput);

    // 카운트 숫자 최신화
    // 카운트 안의 값 5 안넘어가게 설정
    if (cnt >=5){
        cnt = 5
    }
    circle.innerText = cnt

    // 카운트 5번 되면 모달창 띄우기
    if (cnt===5){
        console.log("open")
        openModal()
    }

    // up, down, bent 판정
    if (prediction[0].probability.toFixed(2) == 1.0) {
        if (status == "down") {
            status = "up"
            cnt++
        }
    }
    else if (prediction[1].probability.toFixed(2) == 1.0) {
        if (status == "up") {
            status = "down"
        }
    }
    else if (prediction[2].probability.toFixed(2) == 1.0) {
        if (status == "down") {
            var audio = new Audio("/static/bent.mp3")
            audio.play();
        }
    }

    // 판단 후 갱신된 status로 firebase의 LED제어 값 갱신
    if(status != "bent"){
        f_data = part + status
        FirebaseLEDSetByPart(f_data)
    }

    drawPose(pose);
}

function drawPose(pose) {
    if (webcam.canvas) {
        ctx.drawImage(webcam.canvas, 0, 0);
        if (pose) {
            const minPartConfidence = 0.5;
            tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
            tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
        }
    }
}