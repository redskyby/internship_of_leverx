import { Router } from "express";
import UserController from "../controllers/userController";
import checkRegistration from "../middleware/checkRegistration";
import checkLogin from "../middleware/checkLogin";
import checkToken from "../middleware/checkToken";
import updateInformation from "../middleware/updateUserInformation";
import validationResult from "../middleware/validationResult";

const router: Router = Router();

router.post("/users", checkRegistration, validationResult, UserController.registration);
router.post("/login", checkLogin, validationResult, UserController.login);
router.get("/information", checkToken, UserController.getAllInformation);
router.put("/information", checkToken, updateInformation, validationResult, UserController.updateSomeInformation);

export default router;
