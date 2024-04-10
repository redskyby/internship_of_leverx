import serviceForUserRegistration from "../service/registrationService";
import { Request, Response } from "express";
import registrationService from "../service/registrationService";
import loginService from "../service/loginService";
import jwtService from "../service/jwtService";
import updateService from "../service/updateService";
import postService from "../service/postService";
import posts from "../simpleDatabase/simpleDatabaseOfPosts";
class UserController {
    async registration(req: Request, res: Response) {
        try {
            const { name, lastName, password, email } = req.body;

            const candidate = await registrationService.checkUser("email", email);

            if (candidate) {
                return res.status(403).json({ message: "Пользователь с таким email существует!" });
            }

            const token = await serviceForUserRegistration.createUser(name, lastName, password, email);

            return res.status(200).json({ token });
        } catch (error: any) {
            console.error(error);
            res.status(404).json(error.message);
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            const token = await loginService.checkLogin("email", email, password);

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

            const candidate = await registrationService.checkUser("name", req.user!.name);

            if (!candidate) {
                return res.status(403).json({ message: "Пользователь с таким именем не существует!" });
            }

            const user = await updateService.updateInformation(
                candidate,
                newName,
                newLastName,
                sendToEmail,
                req.user!.email,
            );

            return res.status(200).json(user);
        } catch (error: any) {
            console.error(error);
            res.status(404).json(error.message);
        }
    }

    async createPost(req: Request, res: Response) {
        try {
            const { title, description } = req.body;
            const userName = req.user!.name;

            const candidate = await postService.checkPost("title", title);
            if (candidate) {
                return res.status(403).json({ message: "Пост с таким названием уже существует!" });
            }

            const newPost = await postService.createPost(title, description, userName);

            return res.status(200).json(newPost);
        } catch (error: any) {
            console.error(error);
            res.status(404).json(error.message);
        }
    }

    async showPostByAuthor(req: Request, res: Response) {
        try {
            const { name } = req.user!;

            const candidate = await postService.checkPost("authorName", name);

            if (!candidate) {
                return res.status(403).json({ message: "Постов с таким не автором  существует!" });
            }

            const result = await postService.filter("authorName", name);

            return res.status(200).json(result);
        } catch (error: any) {
            console.error(error);
            res.status(404).json(error.message);
        }
    }

    async deletePostById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);

            const candidate = postService.findIndex(id);

            if (candidate) {
                return res.status(403).json({ message: "Постов с таким не id  существует!" });
            }

            postService.deletePost(candidate);

            return res.status(200).json({ message: "Пост успешно удален.", posts });
        } catch (error: any) {
            console.error(error);
            res.status(404).json(error.message);
        }
    }
    async updatePostById(req: Request, res: Response) {
        try {
            const { id, title, description } = req.body;

            const candidate = await postService.checkPost("id", id);

            if (!candidate) {
                return res.status(403).json({ message: "Постов с таким не id  существует!" });
            }

            postService.updatePost(candidate, title, description);

            return res.status(200).json({ message: "Пост успешно обновлен.", posts });
        } catch (error: any) {
            console.error(error);
            res.status(404).json(error.message);
        }
    }
}

export default new UserController();
