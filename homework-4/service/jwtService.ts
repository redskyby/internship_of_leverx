import jwt from "jsonwebtoken";

class JwtService {
    async generateToken(id: number, name: string, lastName: string, email: string): Promise<string> {
        const accessToken = await jwt.sign({ id, name, lastName, email }, process.env.JWT_ACCESS_SECRET!, {
            expiresIn: "1w",
        });

        return accessToken;
    }
}

export default new JwtService();
