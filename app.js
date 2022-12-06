let myLibrary = [
  {
    title: "Don Quixote",
    author: "Miguel de Cervantes",
    coverLink: "https://m.media-amazon.com/images/I/51iQq6ZYedL.jpg",
    status: "planning",
    score: "",
    chapterCount: "1077",
    chapterProgress: "0",
    startDate: "",
    finishDate: "",
    notes: "",
    id: "lal16xvp3c5srwnr0w2",
  },
  {
    title: "Northanger Abbey",
    author: "Jane Austen",
    coverLink: "https://m.media-amazon.com/images/I/51-k8A19NQL.jpg",
    status: "completed",
    score: "9",
    chapterCount: "320",
    chapterProgress: "320",
    startDate: "",
    finishDate: "",
    notes: "",
    id: "lal17knp65ybhrxtp37",
  },
  {
    title: "Berserk",
    author: "Kentaro Miura",
    coverLink:
      "https://kbimages1-a.akamaihd.net/b7ccda5d-c44e-4041-a1d4-382e69c641a1/1200/1200/False/berserk-volume-1.jpg",
    status: "reading",
    score: "10",
    chapterCount: "",
    chapterProgress: "370",
    startDate: "",
    finishDate: "",
    notes: "",
    id: "lal186jhvlhs2gh1m7b",
  },
];

let currentCard = {};
const addBtn = document.querySelector(".add-btn");
const modalContainer = document.querySelector(".modal-container");
const bookForm = document.querySelector("form");
const mainContent = document.querySelector(".main-content");
const modalCover = document.querySelector(".modal-header .modal-cover");
const modalTitle = document.querySelector(".modal-header .title");
const customAlert = document.getElementById("customAlert");
const defaultImg =
  "https://raw.githubusercontent.com/BookmanJunior/TOP-Library/main/images/icons/defaultImg.jpg";

addBtn.addEventListener("click", addBookModal);
modalContainer.addEventListener("click", closeModal);
window.addEventListener("load", displayBook);
mainContent.addEventListener("click", getCurrentCard);
mainContent.addEventListener("click", deleteCard);
mainContent.addEventListener("click", editCard);
mainContent.addEventListener("click", incrementChapterProgress);
bookForm.title.addEventListener("keyup", function () {
  modalTitle.textContent = this.value;
});
bookForm.coverLink.addEventListener("change", function () {
  modalCover.src = this.value || "images/icons/defaultImg.jpg";
});

function Book(
  title,
  author,
  coverLink,
  readStatus,
  score,
  chapterCount,
  chapterProgress,
  startDate,
  finishDate,
  notes,
  id
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
  this.id = id;
}

function addBookToLibrary(e) {
  e.preventDefault();
  const newBook = new Book(
    (title = bookForm[1].value),
    (author = bookForm[2].value),
    (coverLink = bookForm[3].value || defaultImg),
    (readStatus = bookForm[4].value),
    (score = bookForm[5].value),
    (chapterCount = bookForm[6].value),
    (chapterProgress = bookForm[7].value || "0"),
    (startDate = bookForm[8].value),
    (finishDate = bookForm[9].value),
    (notes = bookForm[10].value),
    (id = generateUniqueId())
  );
  myLibrary.push(newBook);
  bookForm.reset();
  modalContainer.style.display = "none";
  displayBook();
  displaySuccessMsg("added", newBook.title);
}

function displayBook() {
  myLibrary.forEach((book) => {
    const statusSection = document.querySelector(`.list-${book.status}`);
    const cardExist = document.querySelector(`[data-id="${book.id}"]`);

    if (!cardExist) {
      const card = generateCard(book);
      card.setAttribute("data-id", book.id);
      statusSection.appendChild(card);
    }
  });
}

function saveEdit(e) {
  e.preventDefault();
  for (item of bookForm) {
    myLibrary[currentCard.index][item.id] = item.value;
  }
  modalContainer.style.display = "none";
  updateDom();
  displaySuccessMsg("updated", myLibrary[currentCard.index].title);
}

function updateDom() {
  const bookStatus = myLibrary[currentCard.index].status;
  const domSectionStatus = document.querySelector(`.list-${bookStatus}`);
  let domChapterProgress =
    currentCard.container.querySelector(".chapter-progress");
  const {
    title,
    author,
    coverLink,
    status,
    chapterCount,
    chapterProgress,
    score,
  } = myLibrary[currentCard.index];

  if (bookStatus !== domSectionStatus) {
    domSectionStatus.appendChild(currentCard.container);
  }

  currentCard.container.querySelector(".title").textContent = title;
  currentCard.container.querySelector(".author").textContent = author;
  currentCard.container.querySelector(".score").textContent = score;
  currentCard.container.querySelector(".cover").src = coverLink || defaultImg;

  if (!myLibrary[currentCard.index].coverLink) {
    myLibrary[currentCard.index].coverLink = defaultImg;
  }

  status === "reading"
    ? generateIncrementBtn(chapterProgress, domChapterProgress)
    : (domChapterProgress.textContent = `${chapterProgress}/${chapterCount}`);
}

function getCurrentCard(e) {
  if (
    e.target.matches(".delete-btn") ||
    e.target.matches(".edit-btn") ||
    e.target.matches(".increment-btn")
  ) {
    const container = e.target.closest(".card");
    const cardId = container.getAttribute("data-id");
    const index = myLibrary.findIndex((book) => book.id === cardId);
    currentCard = { container, cardId, index };
  }
}

function deleteCard(e) {
  const prompt = `Do you want to remove ${
    myLibrary[currentCard.index].title
  } from the list?`;

  if (e.target.matches(".delete-btn")) {
    if (confirm(prompt)) {
      currentCard.container.remove();
      displaySuccessMsg("deleted", myLibrary[currentCard.index].title);
      myLibrary.splice(currentCard.index, 1);
    }
  }
}

function editCard(e) {
  if (e.target.matches(".edit-btn")) {
    bookForm.removeEventListener("submit", addBookToLibrary);
    bookForm.addEventListener("submit", saveEdit);
    openModal();

    modalCover.src = myLibrary[currentCard.index].coverLink;
    modalTitle.textContent = myLibrary[currentCard.index].title;

    for (item of bookForm) {
      if (item.type !== "submit") {
        item.value = myLibrary[currentCard.index][item.id];
      }
    }
  }
}

function incrementChapterProgress(e) {
  if (e.target.matches(".increment-btn")) {
    myLibrary[currentCard.index].chapterProgress++;
    generateIncrementBtn(
      myLibrary[currentCard.index].chapterProgress,
      currentCard.container.querySelector(".chapter-progress")
    );
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
  editBtn.className = "edit-btn action-btn";
  editBtn.style.backgroundImage = 'url("images/icons/edit.svg")';
  actionBtns.appendChild(editBtn);

  const deleteBtn = document.createElement("div");
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
  const chapterProgress = document.createElement("p");
  chapterProgress.className = "chapter-progress";
  chapterProgress.textContent = item.chapterProgress;
  item.status === "reading"
    ? generateIncrementBtn(item.chapterProgress, chapterProgress)
    : (chapterProgress.textContent = `${item.chapterProgress}/${item.chapterCount}`);
  userProgress.appendChild(chapterProgress);
  const userScore = document.createElement("p");
  userScore.className = "score";
  userScore.textContent = item.score;
  userProgress.appendChild(userScore);
  return card;
}

function generateIncrementBtn(item, element) {
  element.textContent = `${item}`;
  const incrementBtn = document.createElement("span");
  incrementBtn.textContent = "+";
  incrementBtn.className = "increment-btn";
  element.appendChild(incrementBtn);
}

function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function displaySuccessMsg(status, item) {
  customAlert.style.display = "flex";
  customAlert.classList.add("play-animation");
  customAlert.querySelector(".alert-msg").textContent = `${item} list entry
    ${status}`;
  setTimeout(() => {
    customAlert.classList.remove("play-animation");
    customAlert.style.display = "none";
  }, 1300);
}

function openModal() {
  modalContainer.style.display = "flex";
}

function addBookModal() {
  bookForm.removeEventListener("submit", saveEdit);
  bookForm.addEventListener("submit", addBookToLibrary);
  bookForm.reset();
  openModal();
  modalCover.src = defaultImg;
  modalTitle.textContent = "[Title]";
}

function closeModal(e) {
  if (
    e.target.className === "exit-btn" ||
    e.target.className === "modal-container"
  ) {
    modalContainer.style.display = "none";
  }
}
