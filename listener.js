import {
    btnCategory,
    btnSearch,
    btnOpenPopup,
    btnClosePopup,
  } from "./selectors.js";
  import { getCategories } from "./api.js";
  import { openPopup, closePopup } from "./popup.js";
  import { getSearch } from "./helpers.js";
  export function listeners() {
    btnCategory.addEventListener("click", getCategories);
    btnSearch.addEventListener("click", getSearch);
    btnOpenPopup.addEventListener("click", openPopup);
    btnClosePopup.addEventListener("click", closePopup);
  }
  