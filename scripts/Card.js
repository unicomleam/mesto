import { openPopup } from './index.js';

export class Card {
    constructor(name, link, templateSelector) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;

        this._popupImg = document.querySelector('#popup-img');
        this._zoomImg = this._popupImg.querySelector('.popup__image');
        this._figcaptionImg = this._popupImg.querySelector('.popup__figcaption');
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
        return cardElement;
    }

    _setEventListeners() {
        const _cardElementLikeBtn = this._element.querySelector('.element__like-button');
        const _deleteBtn = this._element.querySelector('.element__delete');
        const _cardElementImg = this._element.querySelector('.element__image');

        _cardElementLikeBtn.addEventListener('click', (evt) => {this._toggleLike(evt)});

        _deleteBtn.addEventListener('click', (evt) => {this._deleteElement(evt)});

        _cardElementImg.addEventListener('click', () => {this._handleOpenZoomPopup()});
    }

    _toggleLike(evt) {
        evt.target.classList.toggle('element__like-button_active');
    }

    _deleteElement(evt) {
        evt.target.closest('.element').remove();
    }

    _handleOpenZoomPopup() {
        this._zoomImg.src = this._link;
        this._zoomImg.alt = this._name;
        this._figcaptionImg.textContent = this._name;
        openPopup(this._popupImg);
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__image').alr = this._name;
        this._element.querySelector('.element__appellation').textContent = this._name;

        return this._element;
    }
}