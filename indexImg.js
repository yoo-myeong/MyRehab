ImgBox = document.querySelector("#indexImg")

console.dir(ImgBox.src)

let check = true

function ChangeImg() {
    if(check === true){
        ImgBox.src = "img/ai.jpg"
        ImgBox.style.marginTop = "50px";
        check = false
    }
    else{
        ImgBox.src = "img/rehab.png"
        ImgBox.style.marginTop = "0px";
        check = true
    }
}

setInterval(ChangeImg,1500)