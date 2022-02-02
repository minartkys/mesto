export class UserInfo {
  constructor(profileName, profileText, profileAvatar) {
    this._profileName = profileName;
    this._profileProfession = profileText;
    this._profileAvatar = profileAvatar;
    this._userId;
    this._userInfo = {};
  }
  getUserInfo() {
    this._userInfo = {
      name: this._profileName.textContent,
      about: this._profileProfession.textContent,
      avatar: this._profileAvatar.src,
      _id: this._userId,
    };
    return this._userInfo;
  }

  setUserInfo(userInfo) {
    this._profileName.textContent = userInfo.name;
    this._profileProfession.textContent = userInfo.about;
    this._profileAvatar.src = userInfo.avatar;
    this._userId = userInfo._id;
  }
}
