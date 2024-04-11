import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { User } from "../interfaces/user";

// Этот интерфейс уникальный, оставляю его здесь
declare module "express" {
    interface Request {
        user?: User;
    }
}

export default async function (req: Request, res: Response, next: NextFunction) {
    if (req.method === "OPTIONS") {
        next();
    }
    try {
        // PhpStorm 2022.3.2 argues to me if i use "req.headers.authorization === undefined" without "undefined"
        if (req.headers.authorization === undefined) {
            return res.status(401).json({ message: "Не авторизован" });
        }

        const token = req.headers.authorization.split(" ")[1]; // Bearer asfasnfkajsfnjk

        if (!token) {
            return res.status(401).json({ message: "Не авторизован" });
        }

        // Раз я должен проверить авторизованного пользователя, то я уже получил валидный токен, который ранее сохранил в localStorage
        // Токен приходит с клиента, по своей практике я храню jwt token в localStorage
        // Данные на клиенте декодирую с помощью jwt-decode

        const decoded = (await jwt.verify(token, process.env.JWT_ACCESS_SECRET!)) as User;

        req.user = decoded;
        next();
    } catch (e) {
        console.error(e);
        res.status(401).json({ message: "Ошибка при проверки регистрации!" });
    }
}
