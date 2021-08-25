const select1 = document.querySelector("#select1")
const select2 = document.querySelector("#select2")
const select3 = document.querySelector("#select3")
console.log(select3)
function select2Display(num){
    if (num===1){
        select2.classList.remove("hidden")
    }
    else if (num===2){
        console.log("2 work")
        select3.classList.remove("hidden")
    }
}