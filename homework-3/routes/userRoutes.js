const Router = require("express");
const UserController = require("../controllers/userController");

const router = Router();

router.get("/registration", UserController.registration);


module.exports = router;
