class newUser {
    name;
    lastName;
    password;
    email;
    token;

    constructor(name, lastName, password, email, token) {
        this.name = name;
        this.lastName = lastName;
        this.password = password;
        this.email = email;
        this.token = token;
    }
}
module.exports = newUser;
