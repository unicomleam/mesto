const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

const buttonCloseAdd = document.querySelector('#btn-close-add');
const buttonCloseEdit = document.querySelector('#btn-close-edit');
const buttonCloseImg = document.querySelector('#btn-close-img');

const popupEdit = document.querySelector('#popup-form-edit');
const popupAdd = document.querySelector('#popup-form-add');
const popupImg = document.querySelector('#popup-img');

const zoomImg = popupImg.querySelector('.popup__image');
const figcaptionImg = popupImg.querySelector('.popup__figcaption');

const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');

const popupName = document.querySelector('.popup__input_type_name');
const popupProfession = document.querySelector('.popup__input_type_profession');

const newCardName = document.querySelector('.popup__input_card_name');
const newCardLink = document.querySelector('.popup__input_card_link');

const templateCard = document.querySelector('#template-card-element').content;
const cardsContainer = document.querySelector('.gallery__elements');


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
    cardElementImg.addEventListener('click', function() {
        zoomImg.src = linkCard;
        zoomImg.alt = nameCard;
        figcaptionImg.textContent = nameCard;
        openPopup(popupImg);
    });

    return cardElement;
}

const addCard = (nameCard, linkCard) => {
    cardsContainer.prepend(createCard(nameCard, linkCard));
}

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
    if (evt.target === evt.currentTarget) {
        closePopup(document.querySelector('.popup_opened'));
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
    addCard(item.name, item.link);
})

buttonEdit.addEventListener('click', function() {
    popupName.value = profileName.textContent;
    popupProfession.value = profileProfession.textContent;
    openPopup(popupEdit);
});
buttonAdd.addEventListener('click', () => {openPopup(popupAdd)});

buttonCloseAdd.addEventListener('click', function() {
    closePopup(popupAdd);
});
buttonCloseEdit.addEventListener('click', function() {
    closePopup(popupEdit);
});
buttonCloseImg.addEventListener('click', function() {
    closePopup(popupImg);
})

popupEdit.addEventListener('submit', handleRedactInfo);
popupAdd.addEventListener('submit', addNewCard);