import jwt from "jsonwebtoken";

interface User {
    id: number;
    name: string;
    lastName: string;
    email: string;
    iat: number;
    exp: number;
}

class JwtService {
    async generateToken(id: number, name: string, lastName: string, email: string): Promise<string> {
        const accessToken = await jwt.sign({ id, name, lastName, email }, process.env.JWT_ACCESS_SECRET!, {
            expiresIn: "1w",
        });

        return accessToken;
    }

    async verifyUserToken(token: string): Promise<User> {
        const user = (await jwt.verify(token, process.env.JWT_ACCESS_SECRET!)) as User;
        return user;
    }
}

export default new JwtService();
