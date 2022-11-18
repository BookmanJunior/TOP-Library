let myLibrary = [
  {
    title: "Don Quixote",
    author: "Miguel de Cervantes",
    coverLink: "https://m.media-amazon.com/images/I/51iQq6ZYedL.jpg",
    status: "planning",
    score: "",
    chapterCount: "1077",
    chapterProgress: "",
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

const addBtn = document.querySelector(".add-btn");
const modalContainer = document.querySelector(".modal-container");
const bookForm = document.querySelector("form");
const mainContent = document.querySelector(".main-content");
const modalCover = document.querySelector(".modal-header .modal-cover");
const modalTitle = document.querySelector(".modal-header .title");

addBtn.addEventListener("click", openModal);
modalContainer.addEventListener("click", closeModal);
bookForm.addEventListener("submit", addBookToLibrary);
window.addEventListener("load", displayBook);
mainContent.addEventListener("click", modifyCard);
bookForm.title.addEventListener("keyup", function () {
  modalTitle.textContent = this.value;
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
    (coverLink = bookForm[3].value),
    (readStatus = bookForm[4].value),
    (score = bookForm[5].value),
    (chapterCount = bookForm[6].value),
    (chapterProgress = bookForm[7].value),
    (startDate = bookForm[8].value),
    (finishDate = bookForm[9].value),
    (notes = bookForm[10].value),
    (id = generateUniqueId())
  );

  myLibrary.push(newBook);
  bookForm.reset();
  modalContainer.style.display = "none";
  displayBook();
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

function getCurrentCard(e) {
  let card = {};
  if (e.target.id === "deleteBtn" || e.target.id === "editBtn") {
    const container = e.target.closest(".card");
    const cardId = container.getAttribute("data-id");
    const object = myLibrary.filter((book) => book.id === cardId);
    const index = myLibrary.findIndex((book) => book.id === cardId);

    return (card = { container, object, index });
  }
}

function modifyCard(e) {
  const currentCard = getCurrentCard(e);

  if (e.target.id === "deleteBtn") {
    currentCard.container.remove();
    myLibrary.splice(currentCard.index, 1);
  }

  if (e.target.id === "editBtn") {
    openModal();

    modalCover.src = currentCard.object[0].coverLink;
    modalTitle.textContent = currentCard.object[0].title;

    for (item of bookForm) {
      if (item.type === "submit") {
        continue;
      }
      item.value = currentCard.object[0][item.id];
    }
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

function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
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
