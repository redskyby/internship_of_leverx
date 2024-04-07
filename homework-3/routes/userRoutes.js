const Router = require("express");
const UserController = require("../controllers/userController");
const checkRegistration = require("../middleware/checkRegistration");
const checkLogin = require("../middleware/checkLogin");

const router = Router();
// http://localhost:5000/api/user/registration
router.post("/registration", checkRegistration, UserController.registration);
// http://localhost:5000/api/user/login
router.post("/login", checkLogin, UserController.login);

module.exports = router;
