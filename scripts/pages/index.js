import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { nameConfig, initialCards } from "../utils/constants.js";

const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

const popupEdit = document.querySelector('#popup-form-edit');
const popupAdd = document.querySelector('#popup-form-add');

const popupImg = document.querySelector('#popup-img');
const zoomImg = popupImg.querySelector('.popup__image');
const figcaptionImg = popupImg.querySelector('.popup__figcaption');

const templateSelector = '#template-card-element';

const profileForm = popupEdit.querySelector('.popup__form_edit');
const cardAddForm = popupAdd.querySelector('.popup__form_add');

const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');

const popupName = document.querySelector('.popup__input_type_name');
const popupProfession = document.querySelector('.popup__input_type_profession');

const newCardName = document.querySelector('.popup__input_card_name');
const newCardLink = document.querySelector('.popup__input_card_link');

const cardsContainer = document.querySelector('.gallery__elements');

function handleCardClick(name, link) {
    zoomImg.src = link;
    zoomImg.alt = name;
    figcaptionImg.textContent = name;
    openPopup(popupImg);
}

const addCard = (elem) => {
    cardsContainer.prepend(elem);
}

function createCard(item) {
    const card = new Card(item, templateSelector, handleCardClick);
    return card.generateCard();
};

const openPopup = (popup) => {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeOnEsc);
    popup.addEventListener('click', closePopupOnOverlay);
}

const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeOnEsc);
    popup.removeEventListener('click', closePopupOnOverlay);
}

function closeOnEsc (evt) {
    if (evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_opened'));
    };
};

function closePopupOnOverlay (evt) {
    const closeButton = evt.currentTarget.querySelector('.popup__close');
    if (evt.target === evt.currentTarget || evt.target === closeButton) {
        closePopup(evt.currentTarget);
      };
};

function handleRedactInfo(evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileProfession.textContent = popupProfession.value;
    closePopup(popupEdit);
}

function addNewCard(evt) {
    evt.preventDefault();
    closePopup(popupAdd);
    const elem = createCard({name: newCardName.value, link: newCardLink.value}, handleCardClick);
    addCard(elem);
    evt.target.reset();
}

initialCards.forEach((item) => {
    const elem = createCard(item);
    addCard(elem);
})

const profileValidation = new FormValidator(nameConfig, profileForm);
profileValidation.enableValidation();

const newCardValidation = new FormValidator(nameConfig, cardAddForm);
newCardValidation.enableValidation();

buttonEdit.addEventListener('click', function() {
    profileForm.reset();
    profileValidation.resetValidation();
    popupName.value = profileName.textContent;
    popupProfession.value = profileProfession.textContent;
    openPopup(popupEdit);
});
buttonAdd.addEventListener('click', () => {
    cardAddForm.reset();
    newCardValidation.resetValidation();
    openPopup(popupAdd);
});

popupEdit.addEventListener('submit', handleRedactInfo);
popupAdd.addEventListener('submit', addNewCard);