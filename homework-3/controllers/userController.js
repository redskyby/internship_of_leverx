const bcrypt = require("bcrypt");
const newUser = require("../simpleDatabase/newUser");
const users = require("../simpleDatabase/simpeDatabase");
const jwtService = require("../service/jwtService");
const jwt = require("jsonwebtoken");
const mailService = require("./mailController");

class UserController {
    async registration(req, res) {
        try {
            const { name, lastName, password, email } = req.body;
            //тут должен быть запрос к базе данных
            const candidate = users.find((user) => user.email === email);

            if (candidate) {
                return res.status(403).json({ message: "Пользователь с таким email существует!" });
            }

            const hashPassword = await bcrypt.hash(password, 3);

            const token = await jwtService.generateToken(name, lastName, email);
            const user = new newUser(name, lastName, hashPassword, email, token);

            users.push(user);

            // На клиенте через jwt-decode парсим токен ответ будет в формате :
            // {
            //     "name": "Jon",
            //     "lastName": "Doet1",
            //     "email": "john1.doe@example.com",
            //     "iat": 1712511996,
            //     "exp": 1712515596
            // }

            return res.status(200).json({ token });
        } catch (e) {
            console.error(e);
            res.status(404).json(e);
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;

            const candidate = users.find((user) => user.email === email);

            if (!candidate) {
                return res.status(403).json({ message: "Пользователь с таким email не существует!" });
            }

            const comparePassword = bcrypt.compareSync(String(password), String(candidate.password));

            if (!comparePassword) {
                return res.status(500).json({ message: "Указан неверный пароль" });
            }

            const token = await jwtService.generateToken(candidate.name, candidate.lastName, candidate.email);

            // Обновляем токен в базе данных
            candidate.token = token;

            return res.status(200).json({ token });
        } catch (e) {
            console.error(e);
            res.status(404).json(e);
        }
    }

    async getAllInformation(req, res) {
        try {
            // Обновил токен
            const token = await jwtService.generateToken(req.user.name, req.user.lastName, req.user.email);

            const user = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            // вывел информацию
            // хотя я бы отправлял токен и на клиенте его декодил,
            // но по заданию нужно вывести информацию.
            return res.status(200).json({ user });
        } catch (e) {
            console.error(e);
            res.status(404).json(e);
        }
    }

    async updateSomeInformation(req, res) {
        try {
            const { newName, newLastName } = req.body;

            const candidate = users.find((user) => user.name === req.user.name);

            if (!candidate) {
                return res.status(403).json({ message: "Пользователь с таким именем не существует!" });
            }

            // Обновляем пользователя

            candidate.name = newName;
            candidate.lastName = newLastName;

            // Обновляем токен у пользователя
            const token = await jwtService.generateToken(candidate.name, candidate.lastName, req.user.email);

            candidate.token = token;

            await mailService.sendNewInformation("x0xmik@mail.ru", candidate.name, candidate.lastName);

            const user = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

            // Возвращаю нового пользователя
            // Но лучше новый токен и на клиенте декодил
            return res.status(200).json({ user });
        } catch (e) {
            console.error(e);
            res.status(404).json(e);
        }
    }
}

module.exports = new UserController();
