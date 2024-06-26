const { body, validationResult } = require("express-validator");

module.exports = [
    // Проверка поля title
    body("title")
        .notEmpty()
        .withMessage("Заголовок обязательно для заполнения")
        .isLength({ min: 3, max: 20 })
        .withMessage("Заголовок должна содержать как минимум 3 символа и не больше 20 символов"),
    // Проверка поля description
    body("description")
        .notEmpty()
        .withMessage("Описание обязательна для заполнения")
        .isLength({ min: 4, max: 100 })
        .withMessage("Описание должна содержать как минимум 4 символа и не больше 100 символов"),

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
