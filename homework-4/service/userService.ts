import bcrypt from "bcrypt";
import newUser from "../simpleDatabase/newUser";
import jwtService from "./jwtService";
import userRepositories from "../repositories/userRepository";
import mailService from "./mailService";
import { User } from "../interfaces/user";

class UserService {
    async checkUser(key: keyof User, staff: string): Promise<User | undefined> {
        const candidate = userRepositories.findBy(key, staff);

        if (candidate) {
            throw new Error("Пользователь с таким email существует!");
        }
        return candidate;
    }

    async checkUserByName(key: keyof User, staff: string) {
        const candidate = userRepositories.findBy(key, staff);

        if (!candidate) {
            throw new Error("Пользователь с таким именем не существует!");
        }
        return candidate;
    }

    async createUser(name: string, lastName: string, password: string, email: string): Promise<string> {
        try {
            const hashPassword = await bcrypt.hash(password, 3);
            const newId = userRepositories.getLength() + 1;
            const token = await jwtService.generateToken(newId, name, lastName, email);

            const user = new newUser({
                id: newId,
                name: name,
                lastName: lastName,
                password: hashPassword,
                email: email,
                token: token,
            });

            userRepositories.createUser(user);

            return token;
        } catch (e) {
            console.error("Произошла ошибка при создании пользователя:", e);
            throw new Error("Произошла ошибка при создании пользователя");
        }
    }

    async checkLogin(key: keyof User, staff: string, password: string): Promise<string> {
        const candidate = userRepositories.findBy(key, staff);

        if (!candidate) {
            throw new Error("Пользователь не найден");
        }

        const comparePassword = await bcrypt.compare(String(password), String(candidate.password));

        if (!comparePassword) {
            throw new Error("Указан неверный пароль");
        }

        const token = await jwtService.generateToken(candidate.id, candidate.name, candidate.lastName, candidate.email);

        candidate.token = token;

        return token;
    }

    async updateInformation(user: User, newName: string, newLastName: string, sendToEmail: string) {
        const candidate = userRepositories.findBy("name", user.name);

        if (!candidate) {
            throw new Error("Пользователь не найден");
        }
        candidate.name = newName;
        candidate.lastName = newLastName;

        const token = await jwtService.generateToken(candidate.id, candidate.name, candidate.lastName, user.email);

        candidate.token = token;

        await mailService.sendNewInformation(sendToEmail, candidate.name, candidate.lastName);

        const newUser = await jwtService.verifyUserToken(token);

        return newUser;
    }
}

export default new UserService();
