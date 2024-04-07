const jwt = require("jsonwebtoken");

class JwtService {
    async generateToken(name, lastName, email) {
        const accessToken = await jwt.sign({ name, lastName, email }, process.env.JWT_ACCESS_SECRET, {
            expiresIn: "1w",
        });

        return accessToken;
    }
}

module.exports = new JwtService();
