export class UserInfo {
  constructor(profileName, profileText ) {
    this.profileName = profileName;
    this.profileText = profileText;
    this._inputProfileName = document.querySelector(
      ".popup__input_type_edit-name"
    );
    this._inputProfileJob = document.querySelector(
      ".popup__input_edit-profession"
    );
  }
  getUserInfo() {
    this._inputProfileName.value = this.profileName.textContent;
    this._inputProfileJob.value = this.profileText.textContent;
  }

  setUserInfo() {
    this.profileName.textContent = this._inputProfileName.value;
    this.profileText.textContent = this._inputProfileJob.value;
  }
}
