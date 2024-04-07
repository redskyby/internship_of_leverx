const jwt = require("jsonwebtoken");

class JwtService {
    async generateToken(payload) {
        const accessToken = await jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
            expiresIn: "1h",
        });

        return accessToken;
    }

    async refreshToken(payload) {
        const refreshToken = await jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
            expiresIn: "30h",
        });

        return refreshToken;
    }
}

module.exports = new JwtService();
