import { Card } from "./Card.js";

const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

const popupEdit = document.querySelector('#popup-form-edit');
const popupAdd = document.querySelector('#popup-form-add');

const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');

const popupName = document.querySelector('.popup__input_type_name');
const popupProfession = document.querySelector('.popup__input_type_profession');

const newCardName = document.querySelector('.popup__input_card_name');
const newCardLink = document.querySelector('.popup__input_card_link');

const cardsContainer = document.querySelector('.gallery__elements');

const addCard = (nameCard, linkCard, templateSelector) => {
    const card = new Card(nameCard, linkCard, templateSelector);
    console.log(card);

    cardsContainer.prepend(card.generateCard());
}

export const openPopup = (popup) => {
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
    addCard(newCardName.value, newCardLink.value);
    evt.target.reset();
}

initialCards.forEach((item) => {
    addCard(item.name, item.link, '#template-card-element');
})

buttonEdit.addEventListener('click', function() {
    popupName.value = profileName.textContent;
    popupProfession.value = profileProfession.textContent;
    openPopup(popupEdit);
});
buttonAdd.addEventListener('click', () => {openPopup(popupAdd)});

popupEdit.addEventListener('submit', handleRedactInfo);
popupAdd.addEventListener('submit', addNewCard);