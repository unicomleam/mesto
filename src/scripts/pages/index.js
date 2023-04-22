import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import '../../page/index.css';

import {
    nameConfig,
    initialCards,
    templateSelector,
    buttonEdit,
    buttonAdd,
    profileForm,
    cardAddForm,
    popupName,
    popupProfession
}
    from "../utils/constants.js";

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

const formPopupAddCard = new PopupWithForm({ popupSelector: '#popup-form-add', callbackSubmit: (data) => {
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

    const profileInfo = userInfo.getUserInfo();

    popupName.value = profileInfo.name;
    popupProfession.value = profileInfo.profession;
});
buttonAdd.addEventListener('click', () => {
    formPopupAddCard.open();
    cardAddForm.reset();
    newCardValidation.resetValidation();
});

formPopupAddCard.setEventListeners();
formPopupProfileEdit.setEventListeners();
popupWithImage.setEventListeners();