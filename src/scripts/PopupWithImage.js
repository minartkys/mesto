import { Popup } from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPhoto = document.querySelector(".popup_type_photo");
    this._popupImage = this._popupPhoto.querySelector(".popup__image");
  }
  open() {
    this._popupImage.src = event.target.src;
    this._popupImage.alt = event.target.alt;
    this._popupPhoto.querySelector(".popup__photo-name").textContent =
      event.target.alt;
    super.open();
  }
}
