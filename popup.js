import { popup } from "./selectors.js";

// Функции попап
export function openPopup() {
  popup.classList.add("active");
}
export function closePopup() {
  popup.classList.remove("active");
}
