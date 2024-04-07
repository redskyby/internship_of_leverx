const bcrypt = require("bcrypt");
const newUser = require("../simpleDatabase/newUser");
const users = require("../simpleDatabase/simpeDatabase");
const jwtService = require("../service/jwtService");

class UserController {
    async registration(req, res) {
        const { name, lastName, password, email } = req.body;
        //тут должен быть запрос к базе данных
        const candidate = users.find((user) => user.email === email);
        console.log(users);
        if (candidate) {
            return res.status(403).json({ message: "Пользователь с таким адресом существует!" });
        }

        const hashPassword = await bcrypt.hash(password, 3);
        const token = await jwtService.generateToken({ name, lastName, email });
        const user = new newUser(name, lastName, hashPassword, email, token);

        users.push(user);

        return res.status(200).json({ user });
    }
}

module.exports = new UserController();
