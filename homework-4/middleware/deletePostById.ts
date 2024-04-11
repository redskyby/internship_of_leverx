import { param } from "express-validator";

export default [
    // Проверка поля id
    param("id")
        .notEmpty()
        .withMessage("Id обязательно для заполнения")
        .isNumeric()
        .withMessage("Id должен быть числом"),
];
