const editButton = document.querySelector('.profile__edit-button');
const popupClose = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');
const popupEditForm = document.querySelector('.popup__form');
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');
let popupName = document.querySelector('.popup__input_type_name');
let popupProfession = document.querySelector('.popup__input_type_profession');


function openPopup() {
    popupName.value = profileName.textContent;
    popupProfession.value = profileProfession.textContent;
    popup.classList.add('popup_opened');
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function redactInfo(evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileProfession.textContent = popupProfession.value;
    closePopup()
}

editButton.addEventListener('click', openPopup);
popupClose.addEventListener('click', closePopup);
popupEditForm.addEventListener('submit', redactInfo);
popup.addEventListener('click', function(event) {
    if (event.target === event.currentTarget) {
        closePopup();
    }
});