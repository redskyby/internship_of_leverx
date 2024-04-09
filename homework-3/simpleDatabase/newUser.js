class newUser {
    id;
    name;
    lastName;
    password;
    email;
    token;

    constructor({ id, name, lastName, password, email, token }) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.password = password;
        this.email = email;
        this.token = token;
    }
}
module.exports = newUser;
