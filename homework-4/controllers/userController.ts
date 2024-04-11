import { Request, Response } from "express";
import jwtService from "../service/jwtService";
import userService from "../service/userService";
class UserController {
    async registration(req: Request, res: Response) {
        try {
            const { name, lastName, password, email } = req.body;

            await userService.checkUser("email", email);

            const token = await userService.createUser(name, lastName, password, email);

            return res.status(200).json({ token });
        } catch (error: any) {
            console.error(error);
            res.status(404).json(error.message);
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            const token = await userService.checkLogin("email", email, password);

            return res.status(200).json({ token });
        } catch (error: any) {
            console.error(error);
            res.status(404).json(error.message);
        }
    }

    async getAllInformation(req: Request, res: Response) {
        try {
            const token = await jwtService.generateToken(
                req.user!.id,
                req.user!.name,
                req.user!.lastName,
                req.user!.email,
            );

            const user = await jwtService.verifyUserToken(token);

            return res.status(200).json(user);
        } catch (error: any) {
            console.error(error);
            res.status(404).json(error.message);
        }
    }

    async updateSomeInformation(req: Request, res: Response) {
        try {
            const { newName, newLastName, sendToEmail } = req.body;

            const user = await userService.updateInformation(req.user!, newName, newLastName, sendToEmail);

            return res.status(200).json(user);
        } catch (error: any) {
            console.error(error);
            res.status(404).json(error.message);
        }
    }
}

export default new UserController();
