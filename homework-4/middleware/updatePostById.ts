import { body } from "express-validator";

export default [
    // Проверка поля id
    body("id").notEmpty().withMessage("Id обязательно для заполнения").isNumeric().withMessage("Id должен быть числом"),
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
];
