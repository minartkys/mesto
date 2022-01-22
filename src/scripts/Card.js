export class Card {
  constructor(item, template, handleCardClick) {
    this._link = item.link;
    this._name = item.name;
    this._template = template;
    this._handleCardClick = handleCardClick;
  }
  _newCard() {
    const newCard = this._template.content
      .querySelector(".element")
      .cloneNode(true);
    return newCard;
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _likeCard(evt) {
    evt.target.classList.toggle("element__like-active");
  }
  _setEventListeners() {
    const buttonDeleteCard = this._element.querySelector(".element__delete");
    buttonDeleteCard.addEventListener("click", () => this._deleteCard());
    this._cardImage.addEventListener("click", () => this._handleCardClick());
    const buttonLike = this._element.querySelector(".element__like");
    buttonLike.addEventListener("click", this._likeCard);
  }
  generateCard() {
    this._element = this._newCard();
    this._cardImage = this._element.querySelector(".element__photo");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle = this._element.querySelector(".element__title");
    this._cardTitle.textContent = this._name;
    this._setEventListeners();
    return this._element;
  }
}
