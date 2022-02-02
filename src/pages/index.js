import "./index.css";
import { initialCards } from "../scripts/initialCards.js";
import { FormValidator } from "../scripts/components/FormValidator.js";
import { Card } from "../scripts/components/Card.js";
import { Section } from "../scripts/components/Section.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import { UserInfo } from "../scripts/components/UserInfo .js";
import { PopupWithForm } from "../scripts/components/PopupWithForm.js";
import { Api } from "../scripts/components/Api";
import PopupWithConfirm from "../scripts/components/PopupWithConfirm.js";
const popupEditSelector = ".popup_type_edit";
const popupCardSelector = ".popup_type_card";
const popupPhotoSelector = ".popup_type_photo";
const popupCardDeleteSelector = ".popup_type_cardDelete";
const popupAvatarSelector = ".popup_type_avatar";

const popupTypeEdit = document.querySelector(popupEditSelector);
const popupTypeCard = document.querySelector(popupCardSelector);
const popupTypePhoto = document.querySelector(popupPhotoSelector);
const popupTypeDeleteCard = document.querySelector(popupCardDeleteSelector);
const popupTypeAvatar = document.querySelector(popupAvatarSelector);

const openPopupProfileButton = document.querySelector(".profile__button");
const closePopupProfileButton = popupTypeEdit.querySelector(
  ".popup__button-close"
);
const closePopupCardButton = popupTypeCard.querySelector(
  ".popup__button-close"
);
const formEditProfile = popupTypeEdit.querySelector(".popup__form");
const formCreateCard = popupTypeCard.querySelector(".popup__form");
const formEditAvatar = popupTypeAvatar.querySelector(".popup__form");
const profileName = document.querySelector(".profile__name");
const profileText = document.querySelector(".profile__text");
const profileAvatar = document.querySelector(".profile__avatar");
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
const profileAvatarButton = document.querySelector(".profile__avatar-button");
const formValidationObject = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-save",
  inactiveButtonClass: "popup__button-save_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-34",
  headers: {
    authorization: "6c0ef1ba-4f76-47cf-83cc-830998272ab7",
    "Content-Type": "application/json",
  },
});

const newUserInfo = new UserInfo(profileName, profileText, profileAvatar);
Promise.all([api.getUserInformation(), api.getInitialCards()])
  .then(([profileInfo, initialCards]) => {
    newUserInfo.setUserInfo(profileInfo);

    function createCard(item) {
      const card = new Card(
        item,
        template,
        newUserInfo.getUserInfo()._id,
        openPhotoPopup,
        handleDeleteClick,
        handleLikeClick
      );
      return card.generateCard();
    }
    const cardSection = new Section(initialCards, createCard, elements);
    cardSection.renderer();
  })

  .catch((err) => {
    console.log(err);
  });

const popupWithImage = new PopupWithImage(popupPhotoSelector);
popupWithImage.setEventListeners();

function openPhotoPopup({ link, name }) {
  popupWithImage.open({ link, name });
}
const popupWithConfirm = new PopupWithConfirm(popupCardDeleteSelector);
popupWithConfirm.setEventListeners();

function handleDeleteClick(card) {
  popupWithConfirm.open();
  popupWithConfirm.setSubmit(card);
}

function addCard(item) {
  const card = new Card(
    item,
    template,
    newUserInfo.getUserInfo()._id,
    openPhotoPopup,
    handleDeleteClick,
    handleLikeClick
  );
  return card.generateCard();
}

const newCard = new Section([], addCard, elements);

const popupWithForm = new PopupWithForm(
  popupCardSelector,
  handleCardFormSubmit
);
popupWithForm.setEventListeners();

function handleCardFormSubmit(data) {
  popupWithForm.loading(true);
  api
    .postNewCard(data)
    .then((res) => {
      newCard.addItem(addCard(res));
      popupWithForm.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => popupWithForm.loading(false));
}

openPopupCardButton.addEventListener("click", () => {
  validPopupTypeCard.toggleButtonState();
  popupWithForm.open();
});

const editProfilePopup = new PopupWithForm(
  popupEditSelector,
  handleEditProfile
);

editProfilePopup.setEventListeners();

function handleEditProfile(data) {
  editProfilePopup.loading(true);
  api
    .saveProfileInfo(data)
    .then((data) => {
      newUserInfo.setUserInfo(data);
      editProfilePopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      editProfilePopup.loading(false);
    });
}

openPopupProfileButton.addEventListener("click", () => {
  const userInfo = newUserInfo.getUserInfo();
  inputProfileName.value = userInfo.name;
  inputProfileJob.value = userInfo.about;
  validPopupTypeEdit.toggleButtonState();
  editProfilePopup.open();
});

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

const validPopupTypeAvatar = new FormValidator(
  formEditAvatar,
  formValidationObject
);
validPopupTypeAvatar.enableValidation();

function handleLikeClick(card) {
  if (card.isLiked()) {
    api
      .deleteLike(card._cardId)
      .then((data) => {
        card.setLikesInfo(data);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    api
      .putLike(card._cardId)
      .then((data) => {
        card.setLikesInfo(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
const popupWithAvatar = new PopupWithForm(popupAvatarSelector, editAvatarClick);

popupWithAvatar.setEventListeners();

function editAvatarClick(data) {
  {
    popupWithAvatar.loading(true);
    console.log(data);
    api
      .changeAvatar(data.avatar)
      .then((data) => {
        profileAvatar.src = data.avatar;
        popupWithAvatar.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupWithAvatar.loading(false);
      });
  }
}

profileAvatarButton.addEventListener("click", () => {
  validPopupTypeAvatar.toggleButtonState();
  popupWithAvatar.open();
});
