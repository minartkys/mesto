export class FormValidator {
  constructor(formElement, config) {
    this._formElement = formElement;
    this._config = config;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._config.submitButtonSelector
    );
  }

  _hideInputError(inputElement) {
    const { inputErrorClass, errorClass } = this._config;
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = "";
  }

  _showInputError(inputElement, errorMessage) {
    const { inputErrorClass, errorClass } = this._config;
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  }

  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement, inputElement.validationMessage);
    }
  }

  toggleButtonState() {
    const isFormValid = this._formElement.checkValidity();
    this._buttonElement.disabled = !isFormValid;
    this._buttonElement.classList.toggle(
      this._config.inactiveButtonClass,
      !isFormValid
    );
  }

  _setEventListeners() {
    this.toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  }
  enableValidation() {
    this._setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
  }
}
