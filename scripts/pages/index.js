import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

import { nameConfig, initialCards, templateSelector } from "../utils/constants.js";

const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

const popupEdit = document.querySelector('#popup-form-edit');///
const popupAdd = document.querySelector('#popup-form-add');///

const profileForm = popupEdit.querySelector('.popup__form_edit');////
const cardAddForm = popupAdd.querySelector('.popup__form_add');////

const profileName = document.querySelector('.profile__name');/////
const profileProfession = document.querySelector('.profile__profession');/////

const popupName = document.querySelector('.popup__input_type_name');
const popupProfession = document.querySelector('.popup__input_type_profession');

function handleRedactInfo(evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileProfession.textContent = popupProfession.value;
    closePopup(popupEdit);
}

function createCard(item, templateSelector) {
    const card = new Card(item, templateSelector, () => {popupWithImage.open(item.name, item.link)});
    return card.generateCard();
};

const section = new Section({ data: initialCards, renderer: (item) => {
    section.addItem(createCard(item, templateSelector));
} }, ".gallery__elements");

section.renderItems();

const userInfo = new UserInfo({ name: '.profile__name', info: '.profile__profession' });

const popupWithImage = new PopupWithImage('#popup-img');

const formPopupAddCard = new PopupWithForm({ popupSelector: '#popup-form-add', callbackSubmit: (data) => { /////
    section.addItem(createCard(data, templateSelector));
    formPopupAddCard.close();
} });

const formPopupProfileEdit = new PopupWithForm({ popupSelector: '#popup-form-edit', callbackSubmit: (data) => { userInfo.setUserInfo(data.name, data.profession) } });


const profileValidation = new FormValidator(nameConfig, profileForm);
profileValidation.enableValidation();

const newCardValidation = new FormValidator(nameConfig, cardAddForm);
newCardValidation.enableValidation();


buttonEdit.addEventListener('click', () => {
    formPopupProfileEdit.open();
    profileForm.reset();
    profileValidation.resetValidation();
    popupName.value = userInfo.getUserInfo().name;
    popupProfession.value = userInfo.getUserInfo().profession;
});
buttonAdd.addEventListener('click', () => {
    formPopupAddCard.open();
    cardAddForm.reset();
    newCardValidation.resetValidation();
});

formPopupAddCard.setEventListeners();
formPopupProfileEdit.setEventListeners();
popupWithImage.setEventListeners();