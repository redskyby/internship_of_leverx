import users from "../simpleDatabase/simpeDatabaseOfUsers";
import bcrypt from "bcrypt";
import newUser from "../simpleDatabase/newUser";
import jwtService from "./jwtService";
import userRepositories from "../repositories/userRepository";
import checkService from "./checkService";

interface User {
    id: number;
    name: string;
    lastName: string;
    password: string;
    email: string;
    token: string;
}


class RegistrationService {

    async checkUser( key : keyof User, staff: string){
        const candidate = await checkService.checkUser(key, staff);

        return candidate;
    }

    async createUser(name: string, lastName: string, password: string, email: string): Promise<string> {
        try {
            const hashPassword = await bcrypt.hash(password, 3);
            const newId = users.length + 1;
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
}

export default new RegistrationService();
