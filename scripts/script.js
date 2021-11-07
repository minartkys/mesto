const popup = document.querySelector('.popup');
const openPopupButtons = document.querySelector('.profile__button');
const closePopupButtons = document.querySelector('.popup__button-close');
const savePopupButtons = document.querySelector('.popup__form');
const popupName = document.querySelector('.edit-name');
const popupText = document.querySelector('.edit-profession');
const profileName = document.querySelector('.profile__name');
const profileText = document.querySelector('.profile__text');

function addPopup(){
  popup.classList.add('popup_opened');
  popupName.value = profileName.textContent;
  popupText.value = profileText.textContent;
}

function closePopup(){
  popup.classList.remove('popup_opened');
}

function savePopup(evt){
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileText.textContent = popupText.value;
  closePopup();
}

openPopupButtons.addEventListener('click', addPopup);
closePopupButtons.addEventListener('click', closePopup);
savePopupButtons.addEventListener('submit', savePopup);