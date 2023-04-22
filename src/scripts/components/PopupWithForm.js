import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, callbackSubmit }) {
        super(popupSelector);
        this._popupForm = this._popup.querySelector('.popup__form');
        this._callbackSubmit = callbackSubmit;
        this._inputList = this._popupForm.querySelectorAll('.popup__input');
    }

    _getInputValues() {
        const formValues = {};
        this._inputList.forEach(input => { formValues[input.name] = input.value });
        return formValues
    }

    setEventListeners() {
        super.setEventListeners();

        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._callbackSubmit(this._getInputValues());
            this.close();
        });
    }
}