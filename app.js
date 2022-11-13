let myLibrary = [];

const addBtn = document.querySelector(".add-btn");
const modalContainer = document.querySelector(".modal-container");
const bookForm = document.querySelector("form");
const bookData = Array.from(bookForm.elements);

addBtn.addEventListener("click", openModal);
modalContainer.addEventListener("click", closeModal);
bookForm.addEventListener("submit", addBookToLibrary);

function Book(
  title = bookData[1].value,
  author = bookData[2].value,
  coverImg = bookData[3].value,
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
  this.coverImg = coverImg;
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
  const readingList = document.querySelector(".list-reading");

  for (let i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].status === "reading") {
      readingList.appendChild(createBookStructure(myLibrary[i]));
      console.log("success");
    }
  }
}

function createBookStructure(item) {
  const card = document.createElement("div");
  card.className = "card";
  const cardCover = document.createElement("img");
  cardCover.src = item.coverImg;
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
    modalContainer.style.display = "none";
  }
}
