export class FormValidator {
    constructor(config, formSelector) {
        this._inputList = Array.from(formSelector.querySelectorAll(config.inputSelector));
        this._formSelector = formSelector;
        this._errorClass = config.errorClass;
        this._submitButtonSelector = formSelector.querySelector(config.submitButtonSelector);
        this._inputErrorClass = config.inputErrorClass;
        this._inactiveButtonClass = config.inactiveButtonClass;
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => !inputElement.validity.valid);
    }

    _resetButton() {
        this._submitButtonSelector.classList.add(this._inactiveButtonClass);
        this._submitButtonSelector.disabled = true;
    }

    _toggleButtonState() {
        if (this._hasInvalidInput(this._inputList)) {
            this._resetButton();
        } else {
            this._submitButtonSelector.classList.remove(this._inactiveButtonClass);
            this._submitButtonSelector.disabled = false;
        };
    }

    _showInputError(inputElement, errorElement) {
        errorElement.classList.add(this._errorClass);
        errorElement.textContent = inputElement.validationMessage;
        inputElement.classList.add(this._inputErrorClass);
    }

    _hideInputError(inputElement, errorElement) {
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
        inputElement.classList.remove(this._inputErrorClass);
    }

    _checkInputValidity(inputElement) {
        const errorElement = this._formSelector.querySelector(`.${inputElement.id}-error`);
        if (inputElement.validity.valid) {
            this._hideInputError(inputElement, errorElement);
        } else {
            this._showInputError(inputElement, errorElement);
        };
    }

    _setEventListeners() {
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            })
        });

        this._formSelector.addEventListener('submit', () => {this._resetButton()});
    }

    enableValidation() {
        return this._setEventListeners();
    }
}