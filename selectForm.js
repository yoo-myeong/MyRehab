const select1 = document.querySelector("#select1")
const select2 = document.querySelector("#select2")
const select3 = document.querySelector("#select3")

function select2Display(num){
    if (num===1){
        select2.style.display = ""
    }
    else if (num ===2){
        select3.style.display = ""
    }
}
