let myLibrary = [
  {
    title: "Don Quixote",
    author: "Miguel de Cervantes",
    coverLink: "https://m.media-amazon.com/images/I/51iQq6ZYedL.jpg",
    status: "planning",
    chapterCount: "1077",
  },
];

const addBtn = document.querySelector(".add-btn");
const modalContainer = document.querySelector(".modal-container");
const bookForm = document.querySelector("form");
const bookData = Array.from(bookForm.elements);
const mainContent = document.querySelector(".main-content");
const modalCover = document.querySelector(".modal-header .modal-cover");
const modalTitle = document.querySelector(".modal-header .title");

addBtn.addEventListener("click", openModal);
modalContainer.addEventListener("click", closeModal);
bookForm.addEventListener("submit", addBookToLibrary);
window.addEventListener("load", displayBook);
mainContent.addEventListener("click", modifyCard);

function Book(
  title = bookData[1].value,
  author = bookData[2].value,
  coverLink = bookData[3].value,
  readStatus = bookData[4].value,
  score = bookData[5].value,
  chapterCount = bookData[6].value,
  chapterProgress = bookData[7].value,
  startDate = bookData[8].value,
  finishDate = bookData[9].value,
  notes = bookData[10].value
) {
  this.title = title;
  this.author = author;
  this.coverLink = coverLink;
  this.status = readStatus;
  this.score = score;
  this.chapterCount = chapterCount;
  this.chapterProgress = chapterProgress;
  this.startDate = startDate;
  this.finishDate = finishDate;
  this.notes = notes;
}

function addBookToLibrary(e) {
  e.preventDefault();
  const newBook = new Book();
  myLibrary.push(newBook);
  bookForm.reset();
  modalContainer.style.display = "none";
  displayBook();
}

function displayBook() {
  myLibrary.forEach((book, index) => {
    const statusSection = document.querySelector(`.list-${book.status}`);
    const cardExist = document.querySelector(`[data-id="${index}"]`);

    if (!cardExist) {
      const card = generateCard(book);
      card.dataset.id = index;
      statusSection.appendChild(card);
    }
  });
}

function getCurrentCard(e) {
  let card = {};

  if (e.target.id === "deleteBtn" || e.target.id === "editBtn") {
    const currentCard = e.target.closest(".card");
    const currentCardIndex = parseInt(currentCard.getAttribute("data-id"));

    return (card = {
      currentCard,
      currentCardIndex,
    });
  }
}

function generateCard(item) {
  const card = document.createElement("div");
  card.className = "card";
  const cardCover = document.createElement("img");
  const actionBtns = document.createElement("div");
  actionBtns.className = "actions";
  card.appendChild(actionBtns);
  const editBtn = document.createElement("div");
  editBtn.id = "editBtn";
  editBtn.className = "edit-btn action-btn";
  editBtn.style.backgroundImage = 'url("images/icons/edit.svg")';
  actionBtns.appendChild(editBtn);
  const deleteBtn = document.createElement("div");
  deleteBtn.id = "deleteBtn";
  deleteBtn.className = "delete-btn action-btn";
  deleteBtn.style.backgroundImage = 'url("images/icons/bin.svg")';
  actionBtns.appendChild(deleteBtn);
  cardCover.src = item.coverLink;
  cardCover.className = "cover";
  card.appendChild(cardCover);
  const content = document.createElement("div");
  content.className = "content";
  card.appendChild(content);
  const bookInfo = document.createElement("div");
  bookInfo.className = "book-info";
  content.appendChild(bookInfo);
  const bookTitle = document.createElement("p");
  bookTitle.textContent = item.title;
  bookTitle.className = "title";
  bookInfo.appendChild(bookTitle);
  const bookAuthor = document.createElement("p");
  bookAuthor.className = "author";
  bookAuthor.textContent = item.author;
  bookInfo.appendChild(bookAuthor);
  const userProgress = document.createElement("div");
  userProgress.className = "user-progress-data";
  content.appendChild(userProgress);
  const progress = document.createElement("p");
  progress.textContent = item.chapterProgress;
  userProgress.appendChild(progress);
  const userScore = document.createElement("p");
  userScore.textContent = item.score;
  userProgress.appendChild(userScore);
  return card;
}

function openModal() {
  modalContainer.style.display = "flex";
}

function closeModal(e) {
  if (
    e.target.className === "exit-btn" ||
    e.target.className === "modal-container"
  ) {
    modalCover.src = "";
    modalTitle.textContent = "";
    bookForm.reset();
    modalContainer.style.display = "none";
  }
}
