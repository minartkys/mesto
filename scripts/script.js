const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeCard = document.querySelector(".popup_type_card");
const openPopupProfileButton = document.querySelector(".profile__button");
const closePopupProfileButton = popupTypeEdit.querySelector(
  ".popup__button-close"
);
const closePopupCardButton = popupTypeCard.querySelector(
  ".popup__button-close"
);
const savePopupFormButton = popupTypeEdit.querySelector(".popup__form");
const savePopupCardFormButton = popupTypeCard.querySelector(".popup__form");
const inputProfileName = document.querySelector(".popup__input_type_edit-name");
const inputProfileJob = document.querySelector(".popup__input_edit-profession");
const profileName = document.querySelector(".profile__name");
const profileText = document.querySelector(".profile__text");
const openPopupCardButton = document.querySelector(".profile__button-add");
const inputCardName = popupTypeCard.querySelector(".popup__input_card-name");
const inputCardUrl = popupTypeCard.querySelector(".popup__input_card-url");

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
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
  closePopup(popupTypeCard);
}
closePopupCardButton.addEventListener("click", () => closePopup(popupTypeCard));
openPopupCardButton.addEventListener("click", () => openPopup(popupTypeCard));
openPopupProfileButton.addEventListener("click", openPopupProfile);
closePopupProfileButton.addEventListener("click", () =>
  closePopup(popupTypeEdit)
);
savePopupFormButton.addEventListener("submit", handleProfileFormSubmit);
savePopupCardFormButton.addEventListener("submit", handleCardFormSubmit);

const initialCards = [
  {
    name: "Алтай",
    link: "./images/Алтай.jpg",
  },
  {
    name: "Гора Эльбрус",
    link: "./images/Гора-эльбрус.jpg",
  },
  {
    name: "Карачаево-Черкесск",
    link: "./images/Карачаево-Черкесск.jpg",
  },
  {
    name: "Куршская коса",
    link: "./images/Куршская-коса.jpg",
  },
  {
    name: "Домбай",
    link: "./images/домбай.jpg",
  },
  {
    name: "Озеро Тургояк",
    link: "./images/Lake-Turgoyak.jpg",
  },
];
const template = document.querySelector(".template");

const createCard = (item) => {
  const newCard = template.content.querySelector(".element").cloneNode(true);
  newCard.querySelector(".element__title").textContent = item.name;
  newCard.querySelector(".element__photo").src = item.link;
  newCard.querySelector(".element__photo").alt = item.name;

  const buttonDeleteCard = newCard.querySelector(".element__delete");
  const buttonLike = newCard.querySelector(".element__like");

  buttonDeleteCard.addEventListener("click", deleteCard);
  function likeCard() {
    buttonLike.classList.toggle("element__like-active");
  }
  buttonLike.addEventListener("click", likeCard);

  function openPhoto(photo) {
    openPopup(popupPhoto);
    photo.querySelector(".popup__image").src = item.link;
    photo.querySelector(".popup__image").alt = item.name;
    photo.querySelector(".popup__photo-name").textContent = item.name;
  }

  newCard
    .querySelector(".element__photo")
    .addEventListener("click", () => openPhoto(popupPhoto));

  return newCard;
};

function deleteCard(evt) {
  evt.target.closest(".element").remove();
}

const popupPhoto = document.querySelector(".popup_type_photo");

const closePopupPhotoButton = popupPhoto.querySelector(".popup__button-close");
closePopupPhotoButton.addEventListener("click", () => closePopup(popupPhoto));

const elements = document.querySelector(".elements");

const result = initialCards.map((item) => {
  return createCard(item);
});
elements.append(...result);
