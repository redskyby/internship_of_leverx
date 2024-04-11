import { body } from "express-validator";

export default [
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
    // Проверка поля email
    body("email").isEmail().withMessage("Некорректный формат email"),
    // Проверка поля password
    body("password")
        .isLength({ min: 6, max: 10 })
        .withMessage("Пароль должен содержать как минимум 6 символов и не больше 10 символов"),
];
