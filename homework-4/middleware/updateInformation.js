const { body, validationResult } = require("express-validator");

module.exports = [
    // Проверка поля name
    body("name")
        .notEmpty()
        .withMessage("Имя обязательно для заполнения")
        .isLength({ min: 3, max: 10 })
        .withMessage("Имя должна содержать как минимум 3 символа и не больше 10 символов"),
    // Проверка поля lastName
    body("lastName")
        .notEmpty()
        .withMessage("Фамилия обязательна для заполнения")
        .isLength({ min: 4, max: 10 })
        .withMessage("Фамилия должна содержать как минимум 4 символа и не больше 10 символов"),
    // Проверка поля sendToEmail
    body("sendToEmail").isEmail().withMessage("Некорректный формат email"),

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

            // Продолжаем выполнение если нет ошибок валидации
            next();
        } catch (e) {
            res.status(401).json({ message: "Не авторизован" });
        }
    },
];
