const jwt = require("jsonwebtoken");

class JwtService {
    async generateToken(id, name, lastName, email) {
        const accessToken = await jwt.sign({ id, name, lastName, email }, process.env.JWT_ACCESS_SECRET, {
            expiresIn: "1w",
        });

        return accessToken;
    }
}

module.exports = new JwtService();
