const users = require("../simpleDatabase/simpeDatabaseOfUsers");
const bcrypt = require("bcrypt");
const jwtService = require("./jwtService");
const newUser = require("../simpleDatabase/newUser");
const userRepositories = require("../repositories/userRepository");

class RegistrationService {
    async createUser(name, lastName, password, email) {
        try {
            const hashPassword = await bcrypt.hash(password, 3);
            const newId = users.length + 1;
            const token = await jwtService.generateToken(newId, name, lastName, email);

            const user = new newUser({
                id: newId,
                name: name,
                lastName: lastName,
                password: hashPassword,
                email: email,
                token: token,
            });

            userRepositories.createUser(user);

            return token;
        } catch (e) {
            console.error("Произошла ошибка при создании пользователя:", e);
            throw new Error("Произошла ошибка при создании пользователя");
        }
    }
}

module.exports = new RegistrationService();
