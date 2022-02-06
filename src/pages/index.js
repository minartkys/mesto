import "./index.css";
import { FormValidator } from "../scripts/components/FormValidator.js";
import { Card } from "../scripts/components/Card.js";
import { Section } from "../scripts/components/Section.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import { UserInfo } from "../scripts/components/UserInfo .js";
import { PopupWithForm } from "../scripts/components/PopupWithForm.js";
import { Api } from "../scripts/components/Api";
import PopupWithConfirm from "../scripts/components/PopupWithConfirm.js";

import {
  popupEditSelector,
  popupCardSelector,
  popupPhotoSelector,
  popupCardDeleteSelector,
  popupAvatarSelector,
  openPopupProfileButton,
  formEditProfile,
  formCreateCard,
  formEditAvatar,
  profileName,
  profileText,
  profileAvatar,
  openPopupCardButton,
  template,
  elements,
  inputProfileName,
  inputProfileJob,
  profileAvatarButton,
  formValidationObject,
} from "../scripts/utils/constants.js";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-34",
  headers: {
    authorization: "6c0ef1ba-4f76-47cf-83cc-830998272ab7",
    "Content-Type": "application/json",
  },
});
const cardSection = new Section(
  {
    renderer: (item) => {
      cardSection.addItem(createCard(item));
    },
  },
  elements
);

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

const newUserInfo = new UserInfo(profileName, profileText, profileAvatar);

Promise.all([api.getUserInformation(), api.getInitialCards()])
  .then(([profileInfo, initialCards]) => {
    newUserInfo.setUserInfo(profileInfo);
    cardSection.renderer(initialCards);
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
  popupWithConfirm.setSubmit(() => {
    api
      .deleteCard(card._cardId)
      .then(() => {
        card.deleteCard();
        popupWithConfirm.close();
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

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
      cardSection.addNewItem(createCard(res));
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
    api
      .changeAvatar(data.avatar)
      .then((data) => {
        newUserInfo.setUserInfo(data);
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
