import { param, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

export default [
    // Проверка поля id
    param("id")
        .notEmpty()
        .withMessage("Id обязательно для заполнения")
        .isNumeric()
        .withMessage("Id должен быть числом"),
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
