const Router = require("express");
const UserController = require("../controllers/userController");
const checkRegistration = require("../middleware/checkRegistration");
const checkLogin = require("../middleware/checkLogin");
const checkToken = require("../middleware/checkToken");
const updateInformation = require("../middleware/updateInformation");

const router = Router();
// http://localhost:5000/api/user
router.post("/registration", checkRegistration, UserController.registration);
router.post("/login", checkLogin, UserController.login);
router.get("/getAllInformations", checkToken, UserController.getAllInformation);
router.put("/updateInformation", updateInformation, UserController.updateSomeInformation);

module.exports = router;
