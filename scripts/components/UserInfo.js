export default class UserInfo {
    constructor({ name, info }) {
        this._profileName = document.querySelector(name);
        this._profileProfession = document.querySelector(info);
    }

    getUserInfo() {
        return {name: this._profileName.textContent, profession: this._profileProfession.textContent};
    }

    setUserInfo(name, profession) {
        this._profileName.textContent = name;
        this._profileProfession.textContent = profession;
    }
}