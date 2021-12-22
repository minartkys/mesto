import { initialCards } from "./initialCards.js";
import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";

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
const inputProfileName = document.querySelector(".popup__input_type_edit-name");
const inputProfileJob = document.querySelector(".popup__input_edit-profession");
const profileName = document.querySelector(".profile__name");
const profileText = document.querySelector(".profile__text");
const openPopupCardButton = document.querySelector(".profile__button-add");
const inputCardName = popupTypeCard.querySelector(".popup__input_card-name");
const inputCardUrl = popupTypeCard.querySelector(".popup__input_card-url");
const template = document.querySelector(".template");
const popupPhoto = document.querySelector(".popup_type_photo");
const closePopupPhotoButton = popupPhoto.querySelector(".popup__button-close");
const elements = document.querySelector(".elements");
const popupImage = popupPhoto.querySelector(".popup__image");

const formValidationObject = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-save",
  inactiveButtonClass: "popup__button-save_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", clickEscape);
  document.addEventListener("mousedown", clickOverlay);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", clickEscape);
  document.removeEventListener("mousedown", clickOverlay);
}

function openPopupProfile() {
  openPopup(popupTypeEdit);
  inputProfileName.value = profileName.textContent;
  inputProfileJob.value = profileText.textContent;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileText.textContent = inputProfileJob.value;
  closePopup(popupTypeEdit);
}
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  elements.prepend(
    createCard({ name: inputCardName.value, link: inputCardUrl.value })
  );
  inputCardName.value = "";
  inputCardUrl.value = "";
  closePopup(popupTypeCard);
}
function openPopupCard() {
  openPopup(popupTypeCard);
  validPopupTypeCard.toggleButtonState();
}
closePopupCardButton.addEventListener("click", () => closePopup(popupTypeCard));
openPopupCardButton.addEventListener("click", openPopupCard);
openPopupProfileButton.addEventListener("click", openPopupProfile);
closePopupProfileButton.addEventListener("click", () =>
  closePopup(popupTypeEdit)
);
formEditProfile.addEventListener("submit", handleProfileFormSubmit);
formCreateCard.addEventListener("submit", handleCardFormSubmit);

closePopupPhotoButton.addEventListener("click", () => closePopup(popupPhoto));

function openPhoto(name, link) {
  openPopup(popupPhoto);
  popupImage.src = link;
  popupImage.alt = name;
  popupPhoto.querySelector(".popup__photo-name").textContent = name;
}

function createCard(item) {
  const card = new Card(item, template, openPhoto);
  return card.generateCard();
}

const result = initialCards.map((item) => {
  return createCard(item);
});
elements.append(...result);

function clickOverlay(evt) {
  const openedPopup = document.querySelector(".popup_opened");
  if (evt.target === openedPopup) {
    closePopup(openedPopup);
  }
}

function clickEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

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
