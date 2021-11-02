let popup = document.querySelector('.popup');
let openPopupButtons = document.querySelector('.profile__button');
let closePopupButtons = document.querySelector('.popup__button-close');
let savePopupButtons = document.querySelector('.popup__button-save');
let profileName = document.querySelector('.profile__name');
let profileText = document.querySelector('.profile__text');
let popupName = document.querySelector('.popup__name');
let popupText = document.querySelector('.popup__text');

popup.classList.remove('popup_opened');

openPopupButtons.addEventListener('click', addFunction)
function addFunction(){
  popup.classList.add('popup_opened');
};

closePopupButtons.addEventListener('click', closeFunction)
function closeFunction(){
  popup.classList.remove('popup_opened');
};

savePopupButtons.addEventListener('click', saveFunction)
function saveFunction(){
  profileName.textContent = popupName.value;
  profileText.textContent = popupText.value;
  popup.classList.remove('popup_opened');
};
