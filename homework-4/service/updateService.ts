import jwtService from "./jwtService";
import mailController from "../controllers/mailController";

interface User {
    id: number;
    name: string;
    lastName: string;
    password: string;
    email: string;
    token: string;
}
class UpdateService {
    async updateInformation(candidate: User, newName: string, newLastName: string, sendToEmail: string, email: string) {
        candidate.name = newName;
        candidate.lastName = newLastName;

        const token = await jwtService.generateToken(candidate.id, candidate.name, candidate.lastName, email);

        candidate.token = token;

        await mailController.sendNewInformation(sendToEmail, candidate.name, candidate.lastName);

        const user = await jwtService.verifyUserToken(token);

        return user;
    }
}

export default new UpdateService();
