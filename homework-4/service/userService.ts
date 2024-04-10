import bcrypt from "bcrypt";
import newUser from "../simpleDatabase/newUser";
import jwtService from "./jwtService";
import userRepositories from "../repositories/userRepository";
import checkService from "./checkService";
import mailController from "../controllers/mailController";
import User from "../interfaces/interfaceOfUser";

class UserService {
    async checkUser(key: keyof User, staff: string) {
        const candidate = await checkService.checkUser(key, staff);
        return candidate;
    }

    async createUser(name: string, lastName: string, password: string, email: string): Promise<string> {
        try {
            const hashPassword = await bcrypt.hash(password, 3);
            const newId = userRepositories.checkLength() + 1;
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
        const candidate = await checkService.checkUser(key, staff);

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

    async updateInformation(candidate: User, newName: string, newLastName: string, sendToEmail: string, email: string) {
        try {
            candidate.name = newName;
            candidate.lastName = newLastName;

            const token = await jwtService.generateToken(candidate.id, candidate.name, candidate.lastName, email);

            candidate.token = token;

            await mailController.sendNewInformation(sendToEmail, candidate.name, candidate.lastName);

            const user = await jwtService.verifyUserToken(token);

            return user;
        } catch (e) {
            console.error("Произошла ошибка при обновлении пользователя:", e);
            throw new Error("Произошла ошибка при обновлении пользователя");
        }
    }
}

export default new UserService();
