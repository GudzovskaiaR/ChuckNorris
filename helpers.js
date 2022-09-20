import {
    btnGetJoke,
    btnRandom,
    mainForm,
    divSearch,
    divCategories,
    divFavorite,
    arrayFavoriteJoke,
  } from "./selectors.js";
  import { getRandomJoke, getCategoryJoke, getSearchJoke } from "./api.js";
  
  // Рендер шутки
  export function renderJoke(objectJoke) {
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
             <a href="${objectJoke.url}"><span>ID:</span>${String(
        objectJoke.id
      )} </a>
             <img src="img/link.png" alt="">
         </div>
         <div class="joke-paragraph"><p>${objectJoke.value}</p>
             <div class="joke-text__footer">
                 <div class="footer-time"><p>Last update: <span class="hours">${updateTime} hours ago</span></p></div>
                 <div class="footer-category"><p>${
                   objectJoke.categories
                 }</p></div>
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
  // Удаление активного сердца
  export function removeFavoriteJoke(e) {
    const redFavoriteJoke = e.currentTarget.closest(".main-form__joke");
    const idFavoriteJoke = String(redFavoriteJoke.id);
    arrayFavoriteJoke.forEach((item, index) => {
      if (item.indexOf(idFavoriteJoke) > 0) {
        arrayFavoriteJoke.splice(index);
      }
    });
    renderFavoriteJoke(arrayFavoriteJoke);
  
    redFavoriteJoke.querySelector(
      ".joke-favoriteSymbol"
    ).innerHTML = ` <img class="heart" src="img/h.png" alt="">`;
    const btnFavorite = redFavoriteJoke.querySelector(".heart");
    btnFavorite.addEventListener("click", addFavoriteJoke);
  }
  // Активация сердца
  export function activeHeart(mainDivHeart) {
    const divHeart = mainDivHeart.querySelector(".joke-favoriteSymbol");
    divHeart.innerHTML = `<img class="heartRed" src="img/heart.png" alt=""></img>`;
    const redHeart = document.querySelectorAll(".heartRed");
    redHeart.forEach((item) => {
      item.addEventListener("click", removeFavoriteJoke);
    });
  }
  
  // Добавляем выбранные шутки
  export function addFavoriteJoke(e) {
    const favoriteJoke = e.currentTarget
      .closest(".main-form__joke")
      .cloneNode(true);
    favoriteJoke.className = "formFavorite";
    favoriteJoke.querySelector(".img-massage").src = "img/message2.png";
    favoriteJoke.querySelector(".heart").src = "img/heart.png";
  
    activeHeart(e.currentTarget.closest(".main-form__joke"));
  
    arrayFavoriteJoke.push(favoriteJoke.outerHTML);
  
    renderFavoriteJoke(arrayFavoriteJoke);
  }
  
  // Рендер выбранной шутки
  export function renderFavoriteJoke(favoriteJokes) {
    localStorage.setItem("arrayJoke", JSON.stringify(favoriteJokes));
    divFavorite.innerHTML = favoriteJokes.join("");
  }
  
  // Выбор категории
  export function chosenCategory(e) {
    const currentBtnActive = document.querySelector(".active");
  
    if (currentBtnActive) {
      currentBtnActive.classList.remove("active");
    }
    e.currentTarget.classList.add("active");
  
    btnGetJoke.addEventListener("click", getCategoryJoke);
  }
  // Получение поля поиска
  export async function getSearch() {
    divCategories.innerHTML = "";
    btnGetJoke.removeEventListener("click", getRandomJoke);
    divSearch.insertAdjacentHTML(
      "beforeend",
      `<input class="input"  type="text" placeholder="Free text search..."><div class="error"></div>`
    );
    btnGetJoke.addEventListener("click", getSearchJoke);
  }
  
  btnRandom.addEventListener("click", (e) => {
    divSearch.innerHTML = "";
    divCategories.innerHTML = "";
    btnGetJoke.addEventListener("click", getRandomJoke);
  });
  