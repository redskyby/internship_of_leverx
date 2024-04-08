const jwt = require("jsonwebtoken");

// Так как проверяю авторизованного пользователя, то валидации данных не будет.
// По смыслу она была при регистрации или при входе

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next();
    }
    try {
        const token = req.headers.authorization.split(" ")[1]; // Bearer asfasnfkajsfnjk
        if (!token) {
            return res.status(401).json({ message: "Не авторизован" });
        }

        // Раз я должен проверить авторизованного пользователя, то я уже получил валидный токен, который ранее сохранил в localStorage
        // Токен приходит с клиента, по своей практике я храню jwt token в localStorage
        // Данные на клиенте декодирую с помощью jwt-decode

        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

        req.user = decoded;
        next();
    } catch (e) {
        console.error(e);
        res.status(401).json({ message: "Ошибка при проверки регистрации!" });
    }
};
