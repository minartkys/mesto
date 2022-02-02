import { Popup } from "./Popup.js";
import { api } from "../../../src/pages/index.js";
export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._formSubmit = this._popup.querySelector(".popup__form");
  }

  setSubmit(card) {
    this._formSubmit.addEventListener("submit", (evt) => {
      evt.preventDefault();
      console.log(card);
      api
        .deleteCard(card._cardId)

        .then(() => {
          card.deleteCard();
          this.close();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
  setEventListeners() {
    super.setEventListeners();
  }
}
