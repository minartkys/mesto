export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    
  }
  open() {
    this._popupSelector.classList.add("popup_opened");
    this.setEventListeners();
  }
  close() {
    this._popupSelector.classList.remove("popup_opened");
    this.removeEventListener();
  }
  _handleEscClose(evt){
      if (evt.key === "Escape") {
        this.close();
      }
  }
  _handleOverlayClose(evt) {
    if (evt.target.classList.contains("popup_opened")) {
      this.close();
    }
  }
  setEventListeners(){
    document.addEventListener("keydown", (evt)=> this._handleEscClose(evt));
    document.addEventListener("mousedown",(evt)=> this._handleOverlayClose(evt));
  }
  removeEventListener(){
    document.removeEventListener("keydown",(evt)=> this._handleEscClose(evt));
    document.removeEventListener("mousedown",(evt)=> this._handleOverlayClose(evt));
  }

}
