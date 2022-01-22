import "./index.css";
import { initialCards } from "../scripts/initialCards.js";
import { FormValidator } from "../scripts/FormValidator.js";
import { Card } from "../scripts/Card.js";
import { Section } from "../scripts/Section.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import { UserInfo } from "../scripts/UserInfo .js";
import { PopupWithForm } from "../scripts/PopupWithForm.js";
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeCard = document.querySelector(".popup_type_card");
const openPopupProfileButton = document.querySelector(".profile__button");
const closePopupProfileButton = popupTypeEdit.querySelector(
  ".popup__button-close"
);
const closePopupCardButton = popupTypeCard.querySelector(
  ".popup__button-close"
);
const formEditProfile = popupTypeEdit.querySelector(".popup__form");
const formCreateCard = popupTypeCard.querySelector(".popup__form");
const profileName = document.querySelector(".profile__name");
const profileText = document.querySelector(".profile__text");
const openPopupCardButton = document.querySelector(".profile__button-add");
const inputCardName = popupTypeCard.querySelector(".popup__input_card-name");
const inputCardUrl = popupTypeCard.querySelector(".popup__input_card-url");
const template = document.querySelector(".template");
const popupPhoto = document.querySelector(".popup_type_photo");
const closePopupPhotoButton = popupPhoto.querySelector(".popup__button-close");
const elements = document.querySelector(".elements");

const formValidationObject = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-save",
  inactiveButtonClass: "popup__button-save_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const newUserInfo = new UserInfo(profileName, profileText);

function handleEditProfile() {
  newUserInfo.setUserInfo();
  popupEdit.close();
}

openPopupProfileButton.addEventListener("click", () => {
  newUserInfo.getUserInfo();
  validPopupTypeEdit.toggleButtonState();
  popupEdit.open();
});

const popupEdit = new PopupWithForm(popupTypeEdit, handleEditProfile);

closePopupProfileButton.addEventListener("click", () => popupEdit.close());

const popupWithImage = new PopupWithImage(popupPhoto);

function openPhotoPopup() {
  popupWithImage.open();
}
closePopupPhotoButton.addEventListener("click", () => popupWithImage.close());

function createCard(item) {
  const card = new Card(item, template, openPhotoPopup);
  return card.generateCard();
}

const cardSection = new Section(
  { items: initialCards, renderer: createCard },
  elements
);
cardSection.renderer();

const popupWithForm = new PopupWithForm(popupTypeCard, handleCardFormSubmit);

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  cardSection.addItem(
    createCard({ name: inputCardName.value, link: inputCardUrl.value })
  );
  inputCardName.value = "";
  inputCardUrl.value = "";
  popupWithForm.close();
}
openPopupCardButton.addEventListener("click", () => {
  popupWithForm.open();
  validPopupTypeCard.toggleButtonState();
});

closePopupCardButton.addEventListener("click", () => popupWithForm.close());

const validPopupTypeEdit = new FormValidator(
  formEditProfile,
  formValidationObject
);

validPopupTypeEdit.enableValidation();

const validPopupTypeCard = new FormValidator(
  formCreateCard,
  formValidationObject
);

validPopupTypeCard.enableValidation();
