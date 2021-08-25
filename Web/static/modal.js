const modal = document.querySelector(".modal")
const overlay = modal.querySelector(".modal_overlay")
const closeButton = modal.querySelector("button")
const openModal = () =>{
    modal.classList.remove("hidden")
}

const closeModal = () =>{
    modal.classList.add("hidden");

}

closeButton.addEventListener("click", closeModal)