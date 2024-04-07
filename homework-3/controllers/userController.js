const bcrypt = require("bcrypt");
const user = require("./users");

class UserController {
    async registration(req, res) {
        const { name, lastName, email, password } = req.body;
        //тут должен быть запрос к базе данных
        const candidate = email === user._email;

        if (candidate) {
            return res.status(403).json({ message: "Пользователь с таким адресом существует!" });
        }

        return res.json("ok");
    }
}

module.exports = new UserController();
