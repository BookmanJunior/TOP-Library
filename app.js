let myLibrary = [];

const addBtn = document.querySelector(".add-btn");
const modalContainer = document.querySelector(".modal-container");
const modal = modalContainer.querySelector(".modal");
const form = document.querySelector("form");
const bookData = Array.from(form.elements);

addBtn.addEventListener("click", openModal);
modalContainer.addEventListener("click", closeModal);

function Book(
  title,
  author,
  coverImg,
  readStatus,
  score,
  chapterCount,
  chapterProgress,
  startDate,
  finishDate,
  notes
) {
  this.title = title;
  this.author = author;
  this.coverImg = coverImg;
  this.status = readStatus;
  this.score = score;
  this.chapterCount = chapterCount;
  this.chapterProgress = chapterProgress;
  this.startDate = startDate;
  this.finishDate = finishDate;
  this.notes = notes;
}

function addBookToLibrary() {}

function openModal() {
  modalContainer.style.display = "flex";
}

function closeModal(e) {
  if (
    e.target.className === "exit-btn" ||
    e.target.className === "modal-container"
  ) {
    modalContainer.style.display = "none";
  }
}
