import { validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

export default function (req: Request, res: Response, next: NextFunction) {
    if (req.method === "OPTIONS") {
        next();
    } else {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array().map((error) => error.msg) });
            }
            next();
        } catch (e) {
            res.status(401).json({ message: "Не авторизован" });
        }
    }
}
