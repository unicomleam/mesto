const editButton = document.querySelector('.profile__edit-button');
const popupClose = document.querySelector('.popup__close')
const popup = document.querySelector('.popup');
const popupSubmit = document.querySelector('.popup__submit');
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');

function openPopup() {
    popup.classList.add('popup_opened');
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function redactInfo() {
    let name = document.querySelector('.popup__input_type_name');
    let profession = document.querySelector('.popup__input_type_profession');

    profileName.textContent = name.value;
    profileProfession.textContent = profession.value;
}

editButton.addEventListener('click', openPopup);
popupClose.addEventListener('click', closePopup);
popupSubmit.addEventListener('click', redactInfo);