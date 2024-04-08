const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

module.exports = [
    // Проверка поля id
    body("id").notEmpty().withMessage("Id обязательно для заполнения").isNumeric().withMessage("Id должен быть числом"),
    function (req, res, next) {
        if (req.method === "OPTIONS") {
            next();
        }
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                // Только сообщения
                return res.status(400).json({ errors: errors.array().map((error) => error.msg) });
            }

            const token = req.headers.authorization.split(" ")[1]; // Bearer asfasnfkajsfnjk
            if (!token) {
                return res.status(401).json({ message: "Не авторизован" });
            }

            // Раз я должен проверить авторизованного пользователя, то я уже получил валидный токен, который ранее сохранил в localStorage
            // Токен приходит с клиента, по своей практике я храню jwt token в localStorage
            // Данные на клиенте декодирую с помощью jwt-decode

            const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            req.user = decoded;

            // Продолжаем выполнение если нет ошибок валидации
            next();
        } catch (e) {
            res.status(401).json({ message: "Не авторизован" });
        }
    },
];
