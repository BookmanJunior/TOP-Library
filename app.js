const addBtn = document.querySelector(".add-btn");
const modalContainer = document.querySelector(".modal-container");
const modal = modalContainer.querySelector(".modal");

addBtn.addEventListener("click", openModal);
modalContainer.addEventListener("click", closeModal);

function openModal() {
  modalContainer.style.display = "flex";
}

function closeModal(e) {
  console.log(e.target);
  if (
    e.target.className === "exit-btn" ||
    e.target.className === "modal-container"
  ) {
    modalContainer.style.display = "none";
  }
}
