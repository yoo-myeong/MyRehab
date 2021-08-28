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

start_button = document.querySelector('.start_button')
count_button = document.querySelector('.count_button')
async function init() {

    start_button.classList.add('hidden')
    count_button.classList.remove('hidden')

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
let cnt2 = 0
let count = 0

function statusChange(){
    count ++;
    count %= 2
    console.log(count)
    if(count === 0){
        status = "down"
    }
    else if(count === 1){
        status = "up"
    }
}
let num = 0
rehabImg = document.getElementById("rehabImg");

let bent = false
audio_check = true

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

    // shoulder, knee
    if(part != "backbone"){
        if (prediction[0].probability.toFixed(2) == 1.0) {
            if (status == "up") {
                status = "down";
                cnt++;
                bent = false;
            }
        }
        else if (prediction[1].probability.toFixed(2) == 1.0) {
            if (status == "down") {
                status = "up";
                bent = false;
            }
        }
        else if (prediction[2].probability.toFixed(2) == 1.0) {
            if (status == "up" && bent == false) {
                bent = true;
                var audio = new Audio("/static/bent.mp3");
                audio.play();
            }
        }

        // 판단 후 갱신된 status로 firebase의 LED제어 값 갱신, 시범이미지변화, 매트스테핑변화
        if(status != "bent"){
            f_data = part + status;
            FirebaseLEDSetByPart(f_data);
            rehabImg.src = "/static/img/"+f_data+".jpg/";
        }
    } // backbone이 아닐경우 if문 마침

    // backbone일 경우 if문
    else{
        if (prediction[0].probability.toFixed(2) == 1.0) {
            if (status == "right" || status == "left") {
                setTimeout(function(){ console.log("ready for 1 seconds");},1200);
                if(((parsedlist1[5]>30 && parsedlist2[5]>30))){
                    status = "down";
                    cnt2 ++;
                }
                else{
                    if (audio_check){
                        var audio = new Audio("/static/light.mp3");
                        audio.play();
                        audio_check = false;
                    }
                }
            }
        }
        else if (prediction[1].probability.toFixed(2) == 1.0) {
            if (status == "down") {
                setTimeout(function(){ console.log("ready for 1 seconds");},1200);
                if(((parsedlist2[5]>30 && parsedlist2[6]>30))){
                    status = "right";
                }
                else{
                    if (audio_check){
                        var audio = new Audio("/static/light.mp3");
                        audio.play();
                        audio_check = false;
                    }
                }
            }
        }
        else if (prediction[2].probability.toFixed(2) == 1.0) {
            if (status == "down") {
                setTimeout(function(){ console.log("ready for 1 seconds");},1200);
                if(((parsedlist1[5]>30 && parsedlist1[6]>30))){
                    status = "left";
                }
                else{
                    if (audio_check){
                        var audio = new Audio("/static/light.mp3");
                        audio.play();
                        audio_check = false;
                    }
                }
            }
        }

        cnt = cnt2//2

        // 판단 후 갱신된 status로 firebase의 LED제어 값 갱신, 시범이미지변화, 매트스테핑변화
        if(status != "bent"){
            num = cnt%2;
            f_data = part + status;
            FirebaseLEDSetByPart(f_data);
            if(status == "left" ||status == "right")
            {
                rehabImg.src = "/static/img/"+f_data+".jpg/";
            }
            else{
                rehabImg.src = "/static/img/"+f_data+num+".jpg/";
            }

        }
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