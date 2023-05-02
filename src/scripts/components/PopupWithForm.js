import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, callbackSubmit }) {
        super(popupSelector);
        this._popupForm = this._popup.querySelector('.popup__form');
        this._callbackSubmit = callbackSubmit;
        this._inputList = this._popupForm.querySelectorAll('.popup__input');
        this._buttonSubmit = this._popupForm.querySelector('.popup__button');
        this._buttonSubmitText = this._buttonSubmit.textContent;
    }

    _getInputValues() {
        const formValues = {};
        this._inputList.forEach(input => { formValues[input.name] = input.value });
        return formValues
    }

    setInputValues(data) {
        this._inputList.forEach(input => {
          input.value = data[input.name];
        });
    }

    renderLoading(isLoading, loadingText = "Сохранение...") {
        isLoading ? this._buttonSubmit.textContent = loadingText : this._buttonSubmit.textContent = this._buttonSubmitText;
    }

    setEventListeners() {
        super.setEventListeners();

        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._callbackSubmit(this._getInputValues());
            this.close();
        });
    }

    close() {
        super.close();
        this._popupForm.reset();
    }
}