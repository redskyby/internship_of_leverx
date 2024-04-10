// import newPost  from "../simpleDatabase/newPost";
// import users  from "../simpleDatabase/simpeDatabaseOfUsers";
// import posts  from "../simpleDatabase/simpleDatabaseOfPosts";
// import jwtService from "../service/jwtService";
// import jwt  from "jsonwebtoken";
import serviceForUserRegistration from "../service/registrationService";
import { Request, Response } from "express";
import registrationService from "../service/registrationService";
import loginService from "../service/loginService";
import jwtService from "../service/jwtService";
import updateService from "../service/updateService";
import postService from "../service/postService";
import checkService from "../service/checkService";
import postRepository from "../repositories/postRepository";


interface User {
    id: number;
    name: string;
    lastName: string;
    password: string;
    email: string;
    token: string;
}

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

            const token = await loginService.checkLogin("email" , email, password);

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
            const {title, description} = req.body;
            const userName = req.user!.name;

            const candidate = await postService.checkPost("title", title);
            if (candidate) {
                return res.status(403).json({message : "Пост с таким названием уже существует!"});
            }

            const newPost = await postService.createPost(title , description , userName);

            return res.status(200).json(newPost);
        } catch (error: any) {
            console.error(error);
            res.status(404).json(error.message);
        }
    }
    //
    // async showPostByAuthor(req, res) {
    //     try {
    //         // Запрос
    //         // {
    //         //     "name": "Pasha"
    //         // }
    //
    //         const { name } = req.user;
    //
    //         const candidate = posts.find((item) => item.authorName === name);
    //
    //         if (!candidate) {
    //             return res.status(403).json({ message: "Постов с таким не автором  существует!" });
    //         }
    //
    //         const result = posts.filter((item) => item.authorName === name);
    //
    //         // ответ
    //         // [
    //         //     {
    //         //         "id": 1,
    //         //         "title": "First post",
    //         //         "description": "Description of the first post",
    //         //         "createdDate": "2022-04-05",
    //         //         "authorName": "Pasha"
    //         //     },
    //         //     {
    //         //         "id": 2,
    //         //         "title": "First post1",
    //         //         "description": "Description of the first post",
    //         //         "createdDate": "2022-04-05",
    //         //         "authorName": "Pasha"
    //         //     }
    //         // ]
    //         return res.status(200).json(result);
    //     } catch (e) {
    //         console.error(e);
    //         res.status(404).json(e);
    //     }
    // }
    //
    // async deletePostById(req, res) {
    //     try {
    //         //  запрос
    //         // {
    //         //     "id" : 3
    //         // }
    //
    //         const id = parseInt(req.params.id);
    //
    //         const candidate = posts.findIndex((item) => item.id === id);
    //
    //         if (candidate === -1) {
    //             return res.status(403).json({ message: "Постов с таким не id  существует!" });
    //         }
    //
    //         posts.splice(candidate, 1);
    //
    //         // ответ массив без удаленного поста
    //         // {
    //         //     "message": "Пост успешно удален.",
    //         //     "posts": [
    //         //     {
    //         //         "id": 1,
    //         //         "title": "First post",
    //         //         "description": "Description of the first post",
    //         //         "createdDate": "2022-04-05",
    //         //         "authorName": "Pasha"
    //         //     },
    //         //     {
    //         //         "id": 2,
    //         //         "title": "First post1",
    //         //         "description": "Description of the first post",
    //         //         "createdDate": "2022-04-05",
    //         //         "authorName": "Pasha"
    //         //     }
    //         // ]
    //         // }
    //         return res.status(200).json({ message: "Пост успешно удален.", posts });
    //     } catch (e) {
    //         console.error(e);
    //         res.status(404).json(e);
    //     }
    // }
    // async updatePostById(req, res) {
    //     try {
    //         // запрос
    //         // {
    //         //     "id" : 2,
    //         //     "title": "___First post3__",
    //         //     "description": "Description of the first post__________",
    //         // }
    //
    //         const { id, title, description } = req.body;
    //
    //         const candidate = posts.find((item) => item.id === id);
    //
    //         if (!candidate) {
    //             return res.status(403).json({ message: "Постов с таким не id  существует!" });
    //         }
    //
    //         candidate.title = title;
    //         candidate.description = description;
    //
    //         // ответ массив с измененным постом
    //         // {
    //         //     "message": "Пост успешно обновлен.",
    //         //     "posts": [
    //         //     {
    //         //         "id": 1,
    //         //         "title": "First post",
    //         //         "description": "Description of the first post",
    //         //         "createdDate": "2022-04-05",
    //         //         "authorName": "Pasha"
    //         //     },
    //         //     {
    //         //         "id": 2,
    //         //         "title": "___First post3__",
    //         //         "description": "Description of the first post__________",
    //         //         "createdDate": "2022-04-05",
    //         //         "authorName": "Pasha"
    //         //     },
    //         //     {
    //         //         "id": 3,
    //         //         "title": "Second pos1t",
    //         //         "description": "Description of the second post",
    //         //         "createdDate": "2022-04-04",
    //         //         "authorName": "Jon"
    //         //     }
    //         // ]
    //         // }
    //
    //         return res.status(200).json({ message: "Пост успешно обновлен.", posts });
    //     } catch (e) {
    //         console.error(e);
    //         res.status(404).json(e);
    //     }
    // }
}

export default new UserController();
