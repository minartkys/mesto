import "./index.css";
import { initialCards } from "../scripts/initialCards.js";
import { FormValidator } from "../scripts/components/FormValidator.js";
import { Card } from "../scripts/components/Card.js";
import { Section } from "../scripts/components/Section.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import { UserInfo } from "../scripts/components/UserInfo .js";
import { PopupWithForm } from "../scripts/components/PopupWithForm.js";
const popupEditSelector = ".popup_type_edit";
const popupCardSelector = ".popup_type_card";
const popupPhotoSelector = ".popup_type_photo";
const popupTypeEdit = document.querySelector(popupEditSelector);
const popupTypeCard = document.querySelector(popupCardSelector);
const popupTypePhoto = document.querySelector(popupPhotoSelector);
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
const closePopupPhotoButton = popupTypePhoto.querySelector(
  ".popup__button-close"
);
const elements = document.querySelector(".elements");
const inputProfileName = document.querySelector(".popup__input_type_edit-name");
const inputProfileJob = document.querySelector(".popup__input_edit-profession");

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
  newUserInfo.setUserInfo(inputProfileName.value, inputProfileJob.value);
  popupEdit.close();
}

openPopupProfileButton.addEventListener("click", () => {
  inputProfileName.value = newUserInfo.getUserInfo().name;
  inputProfileJob.value = newUserInfo.getUserInfo().profession;
  validPopupTypeEdit.toggleButtonState();
  popupEdit.open();
});

const popupEdit = new PopupWithForm(popupEditSelector, handleEditProfile);
popupEdit.setEventListeners();
closePopupProfileButton.addEventListener("click", () => popupEdit.close());

const popupWithImage = new PopupWithImage(popupPhotoSelector);
popupWithImage.setEventListeners();
function openPhotoPopup({ link, name }) {
  popupWithImage.open({ link, name });
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

const popupWithForm = new PopupWithForm(
  popupCardSelector,
  handleCardFormSubmit
);
popupWithForm.setEventListeners();
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
