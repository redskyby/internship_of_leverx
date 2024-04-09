import users from "../simpleDatabase/simpeDatabaseOfUsers";

class UserRepository {
    findByEmail(email) {
        return users.find((user) => user.email === email);
    }

    createUser(newUser) {
        users.push(newUser);
    }
}

module.exports = new UserRepository();
