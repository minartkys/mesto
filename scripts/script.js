const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeCard = document.querySelector(".popup_type_card");
const popup = document.querySelector(".popup");
const openPopupButtons = document.querySelector(".profile__button");
const closePopupButtons = document.querySelector(".popup__button-close");
const closePopupButtonsCard = popupTypeCard.querySelector(".popup__button-close");
const savePopupButtons = popupTypeEdit.querySelector(".popup__form");
const savePopupButtonsCard = popupTypeCard.querySelector(".popup__form");
const popupName = document.querySelector(".edit-name");
const popupText = document.querySelector(".edit-profession");
const profileName = document.querySelector(".profile__name");
const profileText = document.querySelector(".profile__text");
const openPopupButtonsCard = document.querySelector(".profile__button-add");
const popupCardName = popupTypeCard.querySelector(".card__name");
const popupCardUrl = popupTypeCard.querySelector(".card__url");

function addPopup() {
  popupTypeEdit.classList.add("popup_opened");
  popupName.value = profileName.textContent;
  popupText.value = profileText.textContent;
}
function addPopupCard() {
  popupTypeCard.classList.add("popup_opened");
}

function closePopup() {
  popupTypeEdit.classList.remove("popup_opened");
}
function closePopupCard() {
  popupTypeCard.classList.remove("popup_opened");
}
function savePopup(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileText.textContent = popupText.value;
  closePopup();
}
function savePopupCard(evt) {
  evt.preventDefault();
  elements.prepend(
    createTaskDomNode({ alt: popupCardName.value, link: popupCardUrl.value })
  );
  closePopupCard();
}
closePopupButtonsCard.addEventListener("click", closePopupCard);
openPopupButtonsCard.addEventListener("click", addPopupCard);
openPopupButtons.addEventListener("click", addPopup);
closePopupButtons.addEventListener("click", closePopup);
savePopupButtons.addEventListener("submit", savePopup);
savePopupButtonsCard.addEventListener("submit", savePopupCard);

const initialCards = [
  {
    alt: "Алтай",
    link: "./images/Алтай.jpg",
  },
  {
    alt: "Гора Эльбрус",
    link: "./images/Гора-эльбрус.jpg",
  },
  {
    alt: "Карачаево-Черкесск",
    link: "./images/Карачаево-Черкесск.jpg",
  },
  {
    alt: "Куршская коса",
    link: "./images/Куршская-коса.jpg",
  },
  {
    alt: "Домбай",
    link: "./images/домбай.jpg",
  },
  {
    alt: "Озеро Тургояк",
    link: "./images/Lake-Turgoyak.jpg",
  },
];
const template = document.querySelector(".template");

const createTaskDomNode = (item) => {
  const taskTemplate = template.content
    .querySelector(".element")
    .cloneNode(true);
  taskTemplate.querySelector(".element__title").textContent = item.alt;
  taskTemplate.querySelector(".element__photo").src = item.link;

  const buttonDeleteCard = taskTemplate.querySelector(".element__delete");
  const ButtonLike = taskTemplate.querySelector(".element__like");
  function deleteCard() {
    taskTemplate.remove();
  }
  buttonDeleteCard.addEventListener("click", deleteCard);
  function likeCard() {
    ButtonLike.classList.toggle("element__like-active");
  }
  ButtonLike.addEventListener("click", likeCard);

  const PopupPhoto = document.querySelector(".popup_photo");
  function addPopupPhoto() {
    PopupPhoto.classList.add("popup_opened");
    PopupPhoto.querySelector(".popup__image").src = item.link;
    PopupPhoto.querySelector(".popup__photo-name").textContent = item.alt;
  }
  function ClosePopupPhoto() {
    PopupPhoto.classList.remove("popup_opened");
  }

  taskTemplate
    .querySelector(".element__photo")
    .addEventListener("click", addPopupPhoto);
  PopupPhoto.querySelector(".popup__button-close").addEventListener(
    "click",
    ClosePopupPhoto
  );

  return taskTemplate;
};
const elements = document.querySelector(".elements");
const result = initialCards.map((item) => {
  return createTaskDomNode(item);
});
elements.prepend(...result);
