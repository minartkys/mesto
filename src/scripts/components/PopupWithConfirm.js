import { Popup } from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._submitFunction;
    this._formSubmit = this._popup.querySelector(".popup__form");
  }

  setSubmit(submitFunction) {
    this._submitFunction = submitFunction;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formSubmit.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitFunction();
    });
  }
}
