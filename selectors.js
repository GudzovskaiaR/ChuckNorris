export const btnGetJoke = document.querySelector(".buttonGetJoke");
export const btnRandom = document.querySelector("#radio_1");
export const mainForm = document.querySelector(".wrapperJoke");
export const btnCategory = document.querySelector("#radio_2");
export const divSearch = document.querySelector(".searchArea");
export const divCategories = document.querySelector(
  ".main-form__radio-buttons"
);
export const btnSearch = document.querySelector("#radio_3");
export const divFavorite = document.querySelector(".selected-jokes");
export const arrayFavoriteJoke =
  JSON.parse(localStorage.getItem("arrayJoke")) || [];
export const btnOpenPopup = document.querySelector(".img");
export const popup = document.querySelector(".main-container__favorite-menu");
export const btnClosePopup = document.querySelector(".imgFavorite");
