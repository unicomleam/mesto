export default class Card {
    constructor(config, templateSelector, handleCardClick) {
        this._name = config.name;
        this._link = config.link;

        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
        this._cardImage = cardElement.querySelector('.element__image');
        this._cardElementLikeBtn = cardElement.querySelector('.element__like-button');

        return cardElement;
    }

    _setEventListeners() {
        const _deleteBtn = this._element.querySelector('.element__delete');

        this._cardElementLikeBtn.addEventListener('click', () => {this._toggleLike()});

        _deleteBtn.addEventListener('click', () => {this._deleteElement()});

        this._cardImage.addEventListener('click', () => {this._handleCardClick(this._name, this._link)});
    }

    _toggleLike() {
        this._cardElementLikeBtn.classList.toggle('element__like-button_active');
    }

    _deleteElement() {
        this._element.closest('.element').remove();
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._element.querySelector('.element__appellation').textContent = this._name;

        return this._element;
    }
}