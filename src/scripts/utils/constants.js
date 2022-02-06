export const popupEditSelector = ".popup_type_edit";
export const popupCardSelector = ".popup_type_card";
export const popupPhotoSelector = ".popup_type_photo";
export const popupCardDeleteSelector = ".popup_type_cardDelete";
export const popupAvatarSelector = ".popup_type_avatar";

export const popupTypeEdit = document.querySelector(popupEditSelector);
export const popupTypeCard = document.querySelector(popupCardSelector);

export const popupTypeAvatar = document.querySelector(popupAvatarSelector);

export const openPopupProfileButton =
  document.querySelector(".profile__button");

export const formEditProfile = popupTypeEdit.querySelector(".popup__form");
export const formCreateCard = popupTypeCard.querySelector(".popup__form");
export const formEditAvatar = popupTypeAvatar.querySelector(".popup__form");
export const profileName = document.querySelector(".profile__name");
export const profileText = document.querySelector(".profile__text");
export const profileAvatar = document.querySelector(".profile__avatar");
export const openPopupCardButton = document.querySelector(
  ".profile__button-add"
);

export const template = document.querySelector(".template");

export const elements = ".elements";
export const inputProfileName = document.querySelector(
  ".popup__input_type_edit-name"
);
export const inputProfileJob = document.querySelector(
  ".popup__input_edit-profession"
);
export const profileAvatarButton = document.querySelector(
  ".profile__avatar-button"
);

export const formValidationObject = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-save",
  inactiveButtonClass: "popup__button-save_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
