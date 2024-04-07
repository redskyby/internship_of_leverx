const Router = require("express");
const UserController = require("../controllers/userController");
const checkRegistration = require("../middleware/checkRegistration");

const router = Router();

router.post("/registration", checkRegistration, UserController.registration);

module.exports = router;
