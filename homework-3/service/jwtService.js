const jwt = require("jsonwebtoken");

class JwtService {
    async generateToken(name, lastName, email) {
        const accessToken = await jwt.sign({ name, lastName, email }, process.env.JWT_ACCESS_SECRET, {
            expiresIn: "1h",
        });

        return accessToken;
    }

    async refreshToken(name, lastName, email) {
        const refreshToken = await jwt.sign({ name, lastName, email }, process.env.JWT_REFRESH_SECRET, {
            expiresIn: "30h",
        });

        return refreshToken;
    }
}

module.exports = new JwtService();
