import registrationService from "./registrationService";
import bcrypt from "bcrypt";
import jwtService from "./jwtService";
import checkService from "./checkService";

interface User {
    id: number;
    name: string;
    lastName: string;
    password: string;
    email: string;
    token: string;
}

class LoginService {
    async checkLogin( key : keyof User, staff: string , password : string): Promise<string> {
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
}

export default new LoginService();
