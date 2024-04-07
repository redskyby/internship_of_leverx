class defaultUser {
    constructor() {
        this._name = "Pasha";
        this._lastName = "Dotsenko";
        this._password = "12345";
        this._email = "pashadocenko@gmail.com";
    }

    _name;
    _lastName;
    _password;
    _email;
}

module.exports = new defaultUser();
