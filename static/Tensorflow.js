// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/pose

// the link to your model provided by Teachable Machine export panel

const URL = "/static/model/";
let model, webcam, ctx, labelContainer, maxPredictions;
part_tag = document.querySelector('.part')
part = part_tag.innerText
circle = document.querySelector('.dot-circle')
circle_text = circle.innerText

async function init() {
    start_button = document.querySelector('.start_button')
    start_button.classList.add('hidden')

    const modelURL = URL + part + "/model.json";
    const metadataURL = URL + part + "/metadata.json";

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // Note: the pose library adds a tmPose object to your window (window.tmPose)
    model = await tmPose.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const size = 400;
    const flip = true; // whether to flip the webcam
    webcam = new tmPose.Webcam(size, size, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);

    // append/get elements to the DOM
    const canvas = document.getElementById("canvas");
    canvas.width = size; canvas.height = size;
    ctx = canvas.getContext("2d");
}

async function loop(timestamp) {
    webcam.update(); // update the webcam frame
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
    // Prediction #1: run input through posenet
    // estimatePose can take in an image, video or canvas html element
    const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
    // Prediction 2: run input through teachable machine classification model
    const prediction = await model.predict(posenetOutput);
    circle.innerText = cnt
    if (cnt>=5){
        console.log("open")
        openModal()
    }

    if (prediction[0].probability.toFixed(2) == 1.0) {
        status = "up"
    }
    else if (prediction[1].probability.toFixed(2) == 1.0) {
        if (status == "up") {
            cnt++
            console.log(cnt)
        }
        status = "down"
    }
    else if (prediction[2].probability.toFixed(2) == 1.0) {
        if (status == "up" || status == "down") {
            console.log("bent")
            var audio = new Audio("/static/bent.mp3")
            audio.play();
        }
        status = "bent"

    }
    else if (prediction[3].probability.toFixed(2) == 1.0) {
        if (status == "up" || status == "down") {
            console.log("bent")
            var audio = new Audio("/static/bent.mp3")
            audio.play();
        }
        status = "bent"

    }

    // finally draw the poses
    drawPose(pose);
}

function drawPose(pose) {
    if (webcam.canvas) {
        ctx.drawImage(webcam.canvas, 0, 0);
        // draw the keypoints and skeleton
        if (pose) {
            const minPartConfidence = 0.5;
            tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
            tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
        }
    }
}