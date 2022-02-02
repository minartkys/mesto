export class Card {
  constructor(
    item,
    template,
    userId,
    handleCardClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._item = item;
    this._template = template;
    this._cardId = item._id;
    this._ownerId = item.owner._id;
    this._link = item.link;
    this._likes = item.likes;
    this._name = item.name;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }
  _newCard() {
    const newCard = this._template.content
      .querySelector(".element")
      .cloneNode(true);
    return newCard;
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _checkDeleteState() {
    if (this._ownerId !== this._userId) {
      this._buttonDeleteCard.remove();
    }
  }

  _getLikeCount() {
    this._likeCounter.textContent = this._likes.length;
    if (this.isLiked()) {
      this._like.classList.add("element__like-active");
    } else {
      this._like.classList.remove("element__like-active");
    }
  }

  isLiked() {
    return Boolean(this._likes.find((item) => item._id === this._userId));
  }

  _setEventListeners() {
    this._buttonDeleteCard.addEventListener("click", () => {
      this._handleDeleteClick(this);
    });
    this._cardImage.addEventListener("click", () =>
      this._handleCardClick({
        name: this._item.name,
        link: this._item.link,
      })
    );
    this._like.addEventListener("click", () => {
      this._handleLikeClick(this);
    });
  }

  setLikesInfo(data) {
    this._likes = data.likes;
    this._getLikeCount();
  }

  generateCard() {
    this._element = this._newCard();
    this._cardImage = this._element.querySelector(".element__photo");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle = this._element.querySelector(".element__title");
    this._cardTitle.textContent = this._name;
    this._like = this._element.querySelector(".element__like");
    this._likeCounter = this._element.querySelector(".element__like-counter");
    this._buttonDeleteCard = this._element.querySelector(".element__delete");
    this._checkDeleteState();
    this._getLikeCount();
    this._setEventListeners();
    return this._element;
  }
}
