const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const closeButtonAdd = document.querySelector('#btn-close-add');
const closeButtonEdit = document.querySelector('#btn-close-edit');
const closeButtonImg = document.querySelector('#btn-close-img');

const popupEdit = document.querySelector('#popup-form-edit');
const popupAdd = document.querySelector('#popup-form-add');
const popupImg = document.querySelector('#popup-img');

const zoomImg = popupImg.querySelector('.popup__image');
const figcaptionImg = popupImg.querySelector('.popup__figcaption');

let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');

let popupName = document.querySelector('.popup__input_type_name');
let popupProfession = document.querySelector('.popup__input_type_profession');

let newCardName = document.querySelector('.popup__input_card_name');
let newCardLink = document.querySelector('.popup__input_card_link');

const templateCard = document.querySelector('#template-card-element').content;
const gallaryList = document.querySelector('.gallery__elements');

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const createCard = (nameCard, linkCard) => {
    const cardElement = templateCard.querySelector('.element').cloneNode(true);
    const cardElementImg = cardElement.querySelector('.element__image');
    const cardElementAppellation = cardElement.querySelector('.element__appellation');
    const cardElementLikeBtn = cardElement.querySelector('.element__like-button');

    cardElementImg.src = linkCard;
    cardElementImg.alt = nameCard;
    cardElementAppellation.textContent = nameCard;

    cardElementLikeBtn.addEventListener('click', () => {
        cardElementLikeBtn.classList.toggle('element__like-button_active');
    });
    cardElement.querySelector('.element__delete').addEventListener('click', () => {cardElement.remove();});
    cardElementImg.addEventListener('click', () => {
        openPopupImg(nameCard, linkCard);
    });

    return cardElement;
}

const addCard = (nameCard, linkCard) => {
    gallaryList.prepend(createCard(nameCard, linkCard));
}

function openPopupEdit() {
    popupName.value = profileName.textContent;
    popupProfession.value = profileProfession.textContent;
    popupEdit.classList.add('popup_opened');
}

function openPopupAdd() {
    popupAdd.classList.add('popup_opened');
}

function openPopupImg(nameCard, linkCard) {
    zoomImg.src = linkCard;
    zoomImg.alt = nameCard;
    figcaptionImg.textContent = nameCard;
    popupImg.classList.add('popup_opened');
}

const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
}

function redactInfo(evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileProfession.textContent = popupProfession.value;
    closePopup(popupEdit);
}

function addNewCard(evt) {
    evt.preventDefault();
    initialCards.push({name: newCardName.value, link: newCardLink.value});
    closePopup(popupAdd);
    addCard(newCardName.value, newCardLink.value);
    newCardName.value = '';
    newCardLink.value = '';
}

initialCards.forEach((item) => {
    addCard(item.name, item.link);
})

editButton.addEventListener('click', openPopupEdit);
addButton.addEventListener('click', openPopupAdd);

closeButtonAdd.addEventListener('click', function() {
    closePopup(popupAdd);
});
closeButtonEdit.addEventListener('click', function() {
    closePopup(popupEdit);
});
closeButtonImg.addEventListener('click', function() {
    closePopup(popupImg);
})

popupEdit.addEventListener('submit', redactInfo);
popupAdd.addEventListener('submit', addNewCard);