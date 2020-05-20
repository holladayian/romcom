// Create variables targetting the relevant DOM elements here 👇
var coverImageElement = document.querySelector(".cover-image");
var title = document.querySelector(".cover-title");
var tagline = document.querySelector(".tagline");
var tagline1 = document.querySelector(".tagline-1");
var tagline2 = document.querySelector(".tagline-2");
var randomCoverButton = document.querySelector(".random-cover-button");
var makeNewButton = document.querySelector(".make-new-button");
var createMyBookButton = document.querySelector(".create-new-book-button");
var homeButton = document.querySelector(".home-button");
var saveCoverButton = document.querySelector(".save-cover-button");
var viewSavedButton = document.querySelector(".view-saved-button");
var homeView = document.querySelector(".home-view");
var savedView = document.querySelector(".saved-view");
var formView = document.querySelector(".form-view");
var userCover = document.querySelector(".user-cover");
var userTitle = document.querySelector(".user-title");
var userDesc1 = document.querySelector(".user-desc1");
var userDesc2 = document.querySelector(".user-desc2");
var form = document.querySelector("form");
var savedCoversSection = document.querySelector(".saved-covers-section");
var mainCover = document.querySelector(".main-cover");

// We've provided a few variables below
var savedCovers = [
  new Cover("http://3.bp.blogspot.com/-iE4p9grvfpQ/VSfZT0vH2UI/AAAAAAAANq8/wwQZssi-V5g/s1600/Do%2BNot%2BForsake%2BMe%2B-%2BImage.jpg", "Sunsets and Sorrows", "sunsets", "sorrows")
];

var currentCover;

// Add your event listeners here 👇
window.addEventListener("load", makeCover);
randomCoverButton.addEventListener("click", makeCover);
homeButton.addEventListener("click", toggleHomeView);
makeNewButton.addEventListener("click", toggleFormView);
viewSavedButton.addEventListener("click", toggleSaveView);
createMyBookButton.addEventListener("click", makeUserCover);
saveCoverButton.addEventListener("click", pushSavedCover);
savedCoversSection.addEventListener("dblclick", deleteMiniCover);


// Create your event handlers and other functions here 👇

//optional extension: remove unnecessary functionality of formView button while on form page
// optional extension: stop input value from causing duplicates in arrays
// optional extension: make saved covers smaller

function toggleHomeView() {
  homeView.classList.remove("hidden");
  formView.classList.add("hidden");
  randomCoverButton.classList.remove("hidden");
  saveCoverButton.classList.remove("hidden");
  homeButton.classList.add("hidden");
  savedView.classList.add("hidden");
}

function toggleFormView() {
  homeView.classList.add("hidden");
  formView.classList.remove("hidden");
  homeButton.classList.remove("hidden");
  randomCoverButton.classList.add("hidden");
  saveCoverButton.classList.add("hidden");
  savedView.classList.add("hidden");
}

function toggleSaveView() {
  savedView.classList.remove("hidden");
  homeView.classList.add("hidden");
  formView.classList.add("hidden");
  homeButton.classList.remove("hidden");
  randomCoverButton.classList.add("hidden");
  saveCoverButton.classList.add("hidden");
  showSavedCoverArray();
}

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function makeCover() {
  var tagline1 = descriptors[getRandomIndex(descriptors)];
  var tagline2 = descriptors[getRandomIndex(descriptors)];
  var title = titles[getRandomIndex(titles)];
  var coverImgSrc = covers[getRandomIndex(covers)];
  currentCover = new Cover(coverImgSrc, title, tagline1, tagline2);
  displayCover(currentCover);
}

function makeUserCover(event) {
  event.preventDefault();
  var tagline1 = userDesc1.value;
  var tagline2 = userDesc2.value;
  var title = userTitle.value;
  var coverImgSrc = userCover.value;
  currentCover = new Cover(coverImgSrc, title, tagline1, tagline2);
  pushUserCover();
  form.reset();
  toggleHomeView();
  displayCover(currentCover);
}

function pushUserCover(coverImgSrc, title, tagline1, tagline2) {
  covers.push(userCover.value);
  titles.push(userTitle.value);
  descriptors.push(userDesc1.value);
  descriptors.push(userDesc2.value);
}

function displayCover(cover) {
  coverImageElement.setAttribute("src", cover.cover);
  title.innerText = cover.title;
  tagline1.innerText = cover.tagline1;
  tagline2.innerText = cover.tagline2;
};

function pushSavedCover() {
  if (!savedCovers.includes(currentCover)) {
    savedCovers.push(currentCover);
  }
}

function showSavedCoverArray() {
  savedCoversSection.innerText = "";
  for (var i = 0; i < savedCovers.length; i++) {
    var newMiniCover = `
      <section class="main-cover" data-id=${savedCovers[i].id}>
        <img class="cover-image" src=${savedCovers[i].cover}>
        <h2 class="cover-title">${savedCovers[i].title}</h2>
        <h3 class="tagline">A tale of <span class="tagline-1">${savedCovers[i].tagline1}</span> and <span class="tagline-2">${savedCovers[i].tagline2}</span></h3>
        <img class="price-tag" src="./assets/price.png">
        <img class="overlay" src="./assets/overlay.png">
      </section>
    `;
    savedCoversSection.insertAdjacentHTML("afterbegin", newMiniCover);
  }
}

function deleteMiniCover(event) {
  if (event.target.closest(".main-cover")) {
    var selectedCoverHTML = event.target.closest(".main-cover");
    for (var i = 0; i < savedCovers.length; i++) {
      if (savedCovers[i].id === Number(selectedCoverHTML.dataset.id)) {
        savedCovers.splice(i, 1);
      }
    }
    showSavedCoverArray();
  }
}
