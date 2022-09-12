const btnGetJoke = document.querySelector(".buttonGetJoke");
const btnRandom = document.querySelector("#radio_1");
const mainForm = document.querySelector(".main-form");
const btnCategory = document.querySelector("#radio_2");
const divSearch = document.querySelector(".searchArea");
const divCategories = document.querySelector(".main-form__radio-buttons");
const btnSearch = document.querySelector("#radio_3");
const divFavorite = document.querySelector(".selected-jokes");

// Удаление активного сердечка
function removeFavoriteJoke(e) {
  const redFavoriteJoke = e.currentTarget.closest(".main-form__joke");
  const idFavoriteJoke = String(redFavoriteJoke.id);
console.log(idFavoriteJoke)
  const removeJoke = divFavorite.querySelector(`#${idFavoriteJoke}`);
  console.log(removeJoke)
  removeJoke.remove();
  redFavoriteJoke.querySelector(
    ".joke-favoriteSymbol"
  ).innerHTML = ` <img class="heart" src="img/h.png" alt="">`;
  const btnFavorite = redFavoriteJoke.querySelector(".heart");
  btnFavorite.addEventListener("click", addFavoriteJoke);
}
// Активация сердца
function activeHeart(mainDivHeart) {
  const divHeart = mainDivHeart.querySelector(".joke-favoriteSymbol");
  divHeart.innerHTML = `<img class="heartRed" src="img/heart.png" alt=""></img>`;
  const redHeart = document.querySelectorAll(".heartRed");
  redHeart.forEach((item) => {
    item.addEventListener("click", removeFavoriteJoke);
  });
}

// Добавляем выбранные шутки
function addFavoriteJoke(e) {
  const favoriteJoke = e.currentTarget
    .closest(".main-form__joke")
    .cloneNode(true);

  favoriteJoke.className = "formFavorite";
  favoriteJoke.querySelector(".img-massage").src = "img/message2.png";
  favoriteJoke.querySelector(".heart").src = "img/heart.png";
  favoriteJoke.querySelector(".footer-category").remove();

  divFavorite.insertAdjacentElement("afterbegin", favoriteJoke);
  activeHeart(e.currentTarget.closest(".main-form__joke"));
}
// Рендер шутки
function renderJoke(objectJoke) {
  const currentDate = new Date();

  const jokeDate = new Date(`${objectJoke.updated_at}`);
  const updateTime = Math.round(
    (currentDate.getTime() - jokeDate.getTime()) / 3600000
  );

  mainForm.insertAdjacentHTML(
    "afterend",
    `<div class="main-form__joke"  id="a${String(objectJoke.id)}" >
    <div class="joke-message">
     
     <img class="img-massage" src="img/message.png" alt="">
    </div>
    <div class="joke-text">
     <div class="joke-text__link">
         <a href="${objectJoke.url}"><span>ID:</span>${String(objectJoke.id)} </a>
         <img src="img/link.png" alt="">
     </div>
     <div class="joke-paragraph"><p>${objectJoke.value}</p>
         <div class="joke-text__footer">
             <div class="footer-time"><p>Last update: <span class="hours">${updateTime} hours ago</span></p></div>
             <div class="footer-category"><p>${objectJoke.categories}</p></div>
            </div>
     </div>
    
    </div>
    
    <div class="joke-favoriteSymbol">
     <img class="heart" src="img/h.png" alt="">
    </div> 
 </div>`
  );
  const btnFavorite = document.querySelectorAll(".heart");

  btnFavorite.forEach((item) => {
    item.addEventListener("click", addFavoriteJoke);
  });
}
// Получаем рандомную шутку

async function getRandomJoke() {
  const random = await fetch("https://api.chucknorris.io/jokes/random");
  const randomJoke = await random.json();

  renderJoke(randomJoke);
}

// Получаем рандомную шутку по категории

async function getCategoryJoke() {
  const categoryName = document.querySelector(".active");

  if (categoryName) {
    const randomCategory = await fetch(
      `https://api.chucknorris.io/jokes/random?category=${categoryName.textContent}`
    );
    const randomCategoryJoke = await randomCategory.json();
    renderJoke(randomCategoryJoke);
  }
}
// Получение списка категорий
async function getCategories() {
  divSearch.innerHTML = "";
  btnCategory.removeEventListener("input", getCategories);
  btnGetJoke.removeEventListener("click", getRandomJoke);
  const categories = await fetch("https://api.chucknorris.io/jokes/categories");
  const category = await categories.json();
  category.forEach((item) => {
    divCategories.insertAdjacentHTML(
      "afterbegin",
      `<button class = "buttons-category" type="button">${item}</button>`
    );
  });
  const btnCategories = divCategories.querySelectorAll("button");
  btnCategories.forEach((item) => {
    item.addEventListener("click", chosenCategory);
  });
}
// Получение значения поиска
async function getSearchJoke() {
  const searchText = document.querySelector(".input");
  if (searchText) {
    if (searchText.value.length >= 3 && searchText.value.length <= 120) {
      const errorElementResult = document.querySelector(".error");
      errorElementResult.innerText = "";
      const searchTextJoke = await fetch(
        `https://api.chucknorris.io/jokes/search?query=${searchText.value}`
      );

      const searchedJoke = await searchTextJoke.json();
      const searchedJokeArray = searchedJoke.result;
      if (searchedJokeArray.length > 0) {
        searchedJokeArray.forEach((item) => {
          return renderJoke(item);
        });
      } else {
        const errorElementResult = document.querySelector(".error");
        errorElementResult.innerText = "No joke found";
      }
    } else {
      const errorElementResult = document.querySelector(".error");
      errorElementResult.innerText =
        " The text must contain from 3 to 120 characters";
    }
  }
}
// Выбор категории
function chosenCategory(e) {
  const currentBtnActive = document.querySelector(".active");

  if (currentBtnActive) {
    // currentBtnActive.removeEventListener('click', chosenCategory)
    currentBtnActive.classList.remove("active");
  }
  e.currentTarget.classList.add("active");

  // console.log(btnActive)
  btnGetJoke.addEventListener("click", getCategoryJoke);
}
// Получение поля поиска
async function getSearch() {
  divCategories.innerHTML = "";
  btnGetJoke.removeEventListener("click", getRandomJoke);
  divSearch.insertAdjacentHTML(
    "beforeend",
    `<input class="input"  type="text" placeholder="Free text search..."> <div class="error"></div>`
  );
  btnGetJoke.addEventListener("click", getSearchJoke);
}

btnRandom.addEventListener("click", (e) => {
  divSearch.innerHTML = "";
  divCategories.innerHTML = "";
  btnGetJoke.addEventListener("click", getRandomJoke);
});

btnCategory.addEventListener("click", getCategories);
btnSearch.addEventListener("click", getSearch);
