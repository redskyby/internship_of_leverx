import registrationService from "./registrationService";
import bcrypt from "bcrypt";
import jwtService from "./jwtService";
import checkLogin from "../middleware/checkLogin";


class LoginService {
    async checkLogin(email: string, password: string): Promise<string> {
        const candidate = await registrationService.checkUser(email);

        if (!candidate) {
            throw new Error( "Пользователь не найден");
        }

        const comparePassword = await bcrypt.compare(String(password), String(candidate.password));

        if (!comparePassword) {
            throw new Error( "Указан неверный пароль");
        }

        const token = await jwtService.generateToken(candidate.id, candidate.name, candidate.lastName, candidate.email);

        candidate.token = token;

        return token;
    }
}

export default new LoginService();
