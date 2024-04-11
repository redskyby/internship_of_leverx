import { body } from "express-validator";

export default [
    // Проверка поля email
    body("email").isEmail().withMessage("Некорректный формат email"),
    // Проверка поля password
    body("password")
        .isLength({ min: 6, max: 10 })
        .withMessage("Пароль должен содержать как минимум 6 символов и не больше 10 символов"),
];
