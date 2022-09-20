import { baseUrl } from "./config.js";
import { renderJoke, chosenCategory } from "./helpers.js";
import {
  btnGetJoke,
  btnCategory,
  divSearch,
  divCategories,
} from "./selectors.js";

// Получаем рандомную шутку

export async function getRandomJoke() {
  const random = await fetch(`${baseUrl}/random`);
  const randomJoke = await random.json();
  renderJoke(randomJoke);
}

// Получаем рандомную шутку по категории

export async function getCategoryJoke() {
  const categoryName = document.querySelector(".active");

  if (categoryName) {
    const randomCategory = await fetch(
      `${baseUrl}/random?category=${categoryName.textContent}`
    );
    const randomCategoryJoke = await randomCategory.json();
    renderJoke(randomCategoryJoke);
  }
}
// Получение списка категорий
export async function getCategories() {
  divSearch.innerHTML = "";
  btnCategory.removeEventListener("input", getCategories);
  btnGetJoke.removeEventListener("click", getRandomJoke);
  const categories = await fetch(`${baseUrl}/categories`);
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
export async function getSearchJoke() {
  const searchText = document.querySelector(".input");
  if (searchText) {
    if (searchText.value.length >= 3 && searchText.value.length <= 120) {
      const errorElementResult = document.querySelector(".error");
      errorElementResult.innerText = "";
      const searchTextJoke = await fetch(
        `${baseUrl}/search?query=${searchText.value}`
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
