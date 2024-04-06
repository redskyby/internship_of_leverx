const Router = require("express");

const router = Router();

router.get("/registration", (req, res) => {
    return res.status(200).json({ message: "Hello world" });
});

module.exports = router;
