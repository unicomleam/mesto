import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithDeletion from "../components/PopupWithDeletion.js";
import '../../page/index.css';

import { api } from "../components/Api.js";
import {
    nameConfig,
    templateSelector,
    buttonEdit,
    buttonAdd,
    buttonEditAvatar,
    profileForm,
    cardAddForm,
    avatarForm
}
    from "../utils/constants.js";

Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, initialCards]) => {
        userInfo.setUserInfo(userData);
        section.renderItems(initialCards);
    })
    .catch((err) => { console.log(`Ошибка: ${err}`) });

function createCard(item, templateSelector) {
    const card = new Card(userInfo.userId, item, templateSelector, () => {popupWithImage.open(item.name, item.link)},
        (cardId, card) => popupWithDeletion.open(cardId, card), putLike, deleteLike);
    return card.generateCard();
};

const putLike = (card) => {
    api.putLike(card.getId())
        .then((res) => { card.setToggleLike(res) })
        .catch((err) => { console.log(`Ошибка: ${err}`) });
};

const deleteLike = (card) => {
    api.deleteLike(card.getId())
    .then((res) => { card.setToggleLike(res) })
    .catch((err) => { console.log(`Ошибка: ${err}`) });
};

const section = new Section((item) => {
    section.addItem(createCard(item, templateSelector));
}, ".gallery__elements");

const userInfo = new UserInfo({ name: ".profile__name", about: ".profile__profession", avatarSelector: ".profile__avatar" });

const popupWithImage = new PopupWithImage('#popup-img');

const popupWithDeletion = new PopupWithDeletion('#popup-delete', () => {
    popupWithDeletion.renderLoading(true);
    api.deleteCard(popupWithDeletion.cardId)
        .then(() => {
            popupWithDeletion.card.remove();
            popupWithDeletion.card = null;/////
            popupWithDeletion.close();
        })
        .finally(() => { popupWithDeletion.renderLoading(false) })
        .catch((err) => { console.log(`Ошибка: ${err}`) });
});

const formPopupAddCard = new PopupWithForm({ popupSelector: '#popup-form-add', callbackSubmit: (data) => {
    formPopupAddCard.renderLoading(true);
    api.postNewCard(data)
        .then((res) => {
            section.addItem(createCard(res, templateSelector));
            formPopupAddCard.close();
        })
        .finally(() => { formPopupAddCard.renderLoading(false) })
        .catch((err) => { console.log(`Ошибка: ${err}`) });
} });

const formPopupProfileEdit = new PopupWithForm({ popupSelector: '#popup-form-edit', callbackSubmit: (formValues) => {
    formPopupProfileEdit.renderLoading(true);
    api.patchUserInfo(formValues)
        .then((data) => {
            userInfo.setUserInfo(data);
            formPopupProfileEdit.close(); ////выкл валид
        })
        .finally(() => { formPopupProfileEdit.renderLoading(false) })
        .catch((err) => { console.log(`Ошибка: ${err}`) });
    }
});

const formPopupAvatarEdit = new PopupWithForm({ popupSelector: '#popup-edit-avatar', callbackSubmit: ({ avatar }) => {
    formPopupAvatarEdit.renderLoading(true);
    api.patchUserAvatar({ avatar })
        .then((res) => {
            userInfo.setUserInfo(res);
            formPopupAvatarEdit.close();
        })
        .finally(() => { formPopupAvatarEdit.renderLoading(false) })
        .catch((err) => { console.log(`Ошибка: ${err}`) });
    } 
})



const profileValidation = new FormValidator(nameConfig, profileForm);
profileValidation.enableValidation();

const newCardValidation = new FormValidator(nameConfig, cardAddForm);
newCardValidation.enableValidation();

////add valid avatar
const avatarValidation = new FormValidator(nameConfig, avatarForm);
avatarValidation.enableValidation();

buttonEdit.addEventListener('click', () => {
    formPopupProfileEdit.setInputValues(userInfo.getUserInfo());
    formPopupProfileEdit.open();
    profileValidation.resetValidation();
});
buttonAdd.addEventListener('click', () => {
    formPopupAddCard.open();
    cardAddForm.reset();
    newCardValidation.resetValidation();
});
buttonEditAvatar.addEventListener("click", () => {
    formPopupAvatarEdit.open();
    avatarValidation.resetValidation();
});

formPopupAddCard.setEventListeners();
formPopupProfileEdit.setEventListeners();
popupWithImage.setEventListeners();
popupWithDeletion.setEventListeners();
formPopupAvatarEdit.setEventListeners();