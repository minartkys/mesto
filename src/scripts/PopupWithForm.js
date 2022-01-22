import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._formElement = popupSelector.querySelector(".popup__form");
    this._inputList =
      popupSelector.querySelectorAll(".popup__input-text");
  }
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", this._handleSubmit);
  }

  removeEventListeners() {
    super.removeEventListeners();
    this._formElement.removeEventListener("submit", this._handleSubmit);
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}
