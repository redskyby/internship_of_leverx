import { body, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

export default [
    // Проверка поля email
    body("email").isEmail().withMessage("Некорректный формат email"),
    // Проверка поля password
    body("password")
        .isLength({ min: 6, max: 10 })
        .withMessage("Пароль должен содержать как минимум 6 символов и не больше 10 символов"),

    function (req: Request, res: Response, next: NextFunction) {
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
