const bcrypt = require("bcrypt");
const newPost = require("../simpleDatabase/newPost");
const users = require("../simpleDatabase/simpeDatabaseOfUsers");
const posts = require("../simpleDatabase/simpleDatabaseOfPosts");
const jwtService = require("../service/jwtService");
const jwt = require("jsonwebtoken");
const mailService = require("./mailController");
const serviceForUserRegistration = require("../service/registrationService");
const userRepositories = require("../repositories/userRepository");

class UserController {
    async registration(req, res) {
        try {
            //     Запрос
            //     {
            //         "name": "Jon",
            //         "lastName": "Doet1",
            //         "email": "john1.doe@example.com",
            //         "password" : "654321"
            //     }

            const { name, lastName, password, email } = req.body;
            //тут должен быть запрос к базе данных
            const candidate = userRepositories.findByEmail(email);

            if (candidate) {
                return res.status(403).json({ message: "Пользователь с таким email существует!" });
            }

            const token = await serviceForUserRegistration.createUser(name, lastName, password);

            // На клиенте через jwt-decode парсим токен ответ будет в формате :
            // {
            //     "name": "Jon",
            //     "lastName": "Doet1",
            //     "email": "john1.doe@example.com",
            //     "iat": 1712511996,
            //     "exp": 1712515596
            // }

            return res.status(200).json({ token });
        } catch (e) {
            console.error(e);
            res.status(404).json(e);
        }
    }

    async login(req, res) {
        try {
            // Запрос
            // {
            //     "name": "Jon",
            //     "lastName": "Doet1",
            //     "email": "john1.doe@example.com",
            //     "password" : "654321"
            // }

            const { email, password } = req.body;

            const candidate = users.find((user) => user.email === email);

            if (!candidate) {
                return res.status(403).json({ message: "Пользователь с таким email не существует!" });
            }

            const comparePassword = await bcrypt.compare(String(password), String(candidate.password));

            if (!comparePassword) {
                return res.status(500).json({ message: "Указан неверный пароль" });
            }

            const token = await jwtService.generateToken(
                candidate.id,
                candidate.name,
                candidate.lastName,
                candidate.email,
            );

            // Обновляем токен в базе данных
            candidate.token = token;

            // Ответ
            // {
            //     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9uIiwibGFzdE5hbWUiOiJEb2V0MSIsImVtYWlsIjoiam9objEuZG9lQGV4YW1wbGUuY29tIiwiaWF0IjoxNzEyNjA1OTY4LCJleHAiOjE3MTMyMTA3Njh9.usO9DdYhBbJOoLSRscXf2_GdjwXa6s9HBWVujpp1HLY"
            // }

            return res.status(200).json({ token });
        } catch (e) {
            console.error(e);
            res.status(404).json(e);
        }
    }

    async getAllInformation(req, res) {
        try {
            // Парсим токен в middleware, который пришел с клиента
            // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiUGFzaGEiLCJsYXN0TmFtZSI6IkRvdHNlbmtvIiwiZW1haWwiOiJwYXNoYWRvY2Vua29AZ21haWwuY29tIiwiaWF0IjoxNzEyNTE5NzUxLCJleHAiOjE3MTMxMjQ1NTF9.TCC31-xc2mEVwmfmWNgWVKkuaEzZnlKVCmSi6pCObsM

            // Обновил токен
            const token = await jwtService.generateToken(req.user.id, req.user.name, req.user.lastName, req.user.email);

            const user = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            // вывел информацию
            // хотя я бы отправлял токен и на клиенте его декодил,
            // но по заданию нужно вывести информацию.

            // Ответ :
            //
            //     "user": {
            //     "name": "Pasha",
            //         "lastName": "Dotsenko",
            //         "email": "pashadocenko@gmail.com",
            //         "iat": 1712606015,
            //         "exp": 1713210815
            // }

            return res.status(200).json(user);
        } catch (e) {
            console.error(e);
            res.status(404).json(e);
        }
    }

    async updateSomeInformation(req, res) {
        try {
            // Токен выше предоставлен выше, дальше и ниже все запросы идут с заголовком авторизации и там токен Bearer
            // {
            //     "name": "Pasha",
            //     "newName" : "Pasha2",
            //     "lastName": "Dotsenko",
            //     "newLastName": "Dotsenko2",
            //     "email": "pashadocenko@gmail.com",
            //     "password" : "123456",
            //     "sendToEmail" : "x0xmik@mail.ru"
            // }
            const { newName, newLastName, sendToEmail } = req.body;

            const candidate = users.find((user) => user.name === req.user.name);

            if (!candidate) {
                return res.status(403).json({ message: "Пользователь с таким именем не существует!" });
            }

            // Обновляем пользователя

            candidate.name = newName;
            candidate.lastName = newLastName;

            // Обновляем токен у пользователя
            const token = await jwtService.generateToken(
                candidate.id,
                candidate.name,
                candidate.lastName,
                req.user.email,
            );

            candidate.token = token;

            await mailService.sendNewInformation(sendToEmail, candidate.name, candidate.lastName);

            const user = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

            // Возвращаю нового пользователя
            // Но лучше новый токен и на клиенте декодил

            // ответ
            //             {
            //                 "name": "Pasha2",
            //                 "lastName": "Dotsenko2",
            //                 "email": "pashadocenko@gmail.com",
            //                 "iat": 1712606238,
            //                 "exp": 1713211038
            //             }
            return res.status(200).json(user);
        } catch (e) {
            console.error(e);
            res.status(404).json(e);
        }
    }

    async createPost(req, res) {
        try {
            // Запрос
            // {
            //     "title": "First post3",
            //     "description": "Description of the first post",
            //     "createdDate": "2022-04-05",
            //     "authorName": "Pasha"
            // }

            const { title, description } = req.body;
            const user = req.user.name;

            const candidate = posts.find((user) => user.title === title);

            if (candidate) {
                return res.status(403).json({ message: "Пост с таким названием уже существует!" });
            }

            const newId = posts.length + 1;
            const newPostInDatabase = new newPost({
                id: newId,
                title: title,
                description: description,
                createdDate: new Date(),
                authorName: user,
            });

            posts.push(newPostInDatabase);

            // ответ
            // {
            //     "id": 4,
            //     "title": "First post3",
            //     "description": "Description of the first post",
            //     "createdDate": "2024-04-08T20:00:36.381Z",
            //     "authorName": "Pasha"
            // }

            return res.status(200).json(newPostInDatabase);
        } catch (e) {
            console.error(e);
            res.status(404).json(e);
        }
    }

    async showPostByAuthor(req, res) {
        try {
            // Запрос
            // {
            //     "name": "Pasha"
            // }

            const { name } = req.user;

            const candidate = posts.find((item) => item.authorName === name);

            if (!candidate) {
                return res.status(403).json({ message: "Постов с таким не автором  существует!" });
            }

            const result = posts.filter((item) => item.authorName === name);

            // ответ
            // [
            //     {
            //         "id": 1,
            //         "title": "First post",
            //         "description": "Description of the first post",
            //         "createdDate": "2022-04-05",
            //         "authorName": "Pasha"
            //     },
            //     {
            //         "id": 2,
            //         "title": "First post1",
            //         "description": "Description of the first post",
            //         "createdDate": "2022-04-05",
            //         "authorName": "Pasha"
            //     }
            // ]
            return res.status(200).json(result);
        } catch (e) {
            console.error(e);
            res.status(404).json(e);
        }
    }

    async deletePostById(req, res) {
        try {
            //  запрос
            // {
            //     "id" : 3
            // }

            const id = parseInt(req.params.id);

            const candidate = posts.findIndex((item) => item.id === id);

            if (candidate === -1) {
                return res.status(403).json({ message: "Постов с таким не id  существует!" });
            }

            posts.splice(candidate, 1);

            // ответ массив без удаленного поста
            // {
            //     "message": "Пост успешно удален.",
            //     "posts": [
            //     {
            //         "id": 1,
            //         "title": "First post",
            //         "description": "Description of the first post",
            //         "createdDate": "2022-04-05",
            //         "authorName": "Pasha"
            //     },
            //     {
            //         "id": 2,
            //         "title": "First post1",
            //         "description": "Description of the first post",
            //         "createdDate": "2022-04-05",
            //         "authorName": "Pasha"
            //     }
            // ]
            // }
            return res.status(200).json({ message: "Пост успешно удален.", posts });
        } catch (e) {
            console.error(e);
            res.status(404).json(e);
        }
    }
    async updatePostById(req, res) {
        try {
            // запрос
            // {
            //     "id" : 2,
            //     "title": "___First post3__",
            //     "description": "Description of the first post__________",
            // }

            const { id, title, description } = req.body;

            const candidate = posts.find((item) => item.id === id);

            if (!candidate) {
                return res.status(403).json({ message: "Постов с таким не id  существует!" });
            }

            candidate.title = title;
            candidate.description = description;

            // ответ массив с измененным постом
            // {
            //     "message": "Пост успешно обновлен.",
            //     "posts": [
            //     {
            //         "id": 1,
            //         "title": "First post",
            //         "description": "Description of the first post",
            //         "createdDate": "2022-04-05",
            //         "authorName": "Pasha"
            //     },
            //     {
            //         "id": 2,
            //         "title": "___First post3__",
            //         "description": "Description of the first post__________",
            //         "createdDate": "2022-04-05",
            //         "authorName": "Pasha"
            //     },
            //     {
            //         "id": 3,
            //         "title": "Second pos1t",
            //         "description": "Description of the second post",
            //         "createdDate": "2022-04-04",
            //         "authorName": "Jon"
            //     }
            // ]
            // }

            return res.status(200).json({ message: "Пост успешно обновлен.", posts });
        } catch (e) {
            console.error(e);
            res.status(404).json(e);
        }
    }
}

module.exports = new UserController();
