export class Card {
  constructor(item, template, OpenPhoto) {
    this._link = item.link;
    this._name = item.name;
    this._template = template;
    this._openPhoto = OpenPhoto;
  }
  _newCard() {
    const newCard = this._template.content
      .querySelector(".element")
      .cloneNode(true);
    return newCard;
  }
  
  _deleteCard(evt) {
    evt.target.closest(".element").remove();
  }

  _likeCard(evt) {
    evt.target.classList.toggle("element__like-active");
  }
  _setEventListeners() {
    const buttonDeleteCard = this._element.querySelector(".element__delete");
    buttonDeleteCard.addEventListener("click", this._deleteCard);
    this._cardImage.addEventListener("click", () => this._openPhoto(this._name, this._link));
    const buttonLike = this._element.querySelector(".element__like");
    buttonLike.addEventListener("click", this._likeCard);
  }
  createCard() {
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
