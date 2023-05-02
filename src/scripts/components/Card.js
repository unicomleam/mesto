export default class Card {
    constructor(id, config, templateSelector, handleCardClick,  handleCardDelete, putLike, deleteLike) {
        this._userId = id;
        this._cardId = config._id;
        this._name = config.name;
        this._link = config.link;

        this._ownerId = config.owner._id;
        this._count = config.likes;
        this.likes = config.likes;

        this._templateSelector = templateSelector;
        this.deleteLike = deleteLike;
        this.putLike = putLike;
        this._handleCardClick = handleCardClick;
        this._handleCardDelete = handleCardDelete;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
        this._cardImage = cardElement.querySelector('.element__image');
        this._cardName = cardElement.querySelector('.element__appellation');
        this._cardElementLikeBtn = cardElement.querySelector('.element__like-button');
        this._deleteBtn = cardElement.querySelector('.element__delete');
        this._likeCount = cardElement.querySelector('.element__like-counter');

        return cardElement;
    }

    getId() { return this._cardId }

    _setEventListeners() {
        this._cardElementLikeBtn.addEventListener('click', () => { this.toggleLike() });

        this._deleteBtn ? this._deleteBtn.addEventListener('click', () => {
            this._handleCardDelete(this._cardId, this._element) }) : '';

        this._cardImage.addEventListener('click', () => {this._handleCardClick(this._name, this._link)});
    }

    setToggleLike(res) {
        this._cardElementLikeBtn.classList.toggle('element__like-button_active');
        this._likeCount.textContent = res.likes.length;
    }

    toggleLike() {
        !this._cardElementLikeBtn.classList.contains("element__like-button_active") ? this.putLike(this) : this.deleteLike(this);
    }

    generateCard() {
        this._element = this._getTemplate();

        if (this._ownerId !== this._userId) {
            this._deleteBtn.remove();
        };
        
        this.likes.some(item => {
            return item._id === this._userId
        }) ? this._cardElementLikeBtn.classList.add('element__like-button_active') : '';
        if (this._count) {
            this._likeCount.textContent = this._count.length;
        };
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardName.textContent = this._name;

        this._setEventListeners();
        return this._element;
    }
}