export default class UserInfo {
    constructor({ name, about, avatarSelector }) {
        this._profileName = document.querySelector(name);
        this._profileProfession = document.querySelector(about);
        this._profileAvatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        return {name: this._profileName.textContent, about: this._profileProfession.textContent};
    }

    setUserInfo({ name, about, avatar, _id }) {
        this._profileName.textContent = name;
        this._profileProfession.textContent = about;
        this._profileAvatar.src = avatar;
        this.userId = _id;
    }
}