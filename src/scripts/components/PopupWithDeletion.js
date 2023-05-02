import Popup from './Popup.js';

export default class PopupWithDeletion extends Popup {
    constructor(selector, callBackDelete) {
        super(selector);
        this._callBackDelete = callBackDelete;
        this.deleteButton = this._popup.querySelector('.popup__button-delete');

        this._buttonSubmit = this._popup.querySelector(".popup__button-delete");
        this._buttonSubmitText = this._buttonSubmit.textContent;////Да
    }

    renderLoading(isLoading, loadingText = "Удаление...") { ////flag
        if (isLoading) {
            this._buttonSubmit.textContent = loadingText;
            this._buttonSubmit.disabled = true;
        } else {
            this._buttonSubmit.textContent = this._buttonSubmitText;
            this._buttonSubmit.disabled = false;
        }
    }

    open(cardId, card) {
        super.open();
        this.cardId = cardId;
        this.card = card;
        this.deleteButton.addEventListener("click", this._callBackDelete);
    }

    close() {
        super.close();
        this.deleteButton.removeEventListener("click", this._callBackDelete);
    }
}