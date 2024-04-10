import { Router } from "express";
import UserController from "../controllers/userController";
import checkRegistration from "../middleware/checkRegistration";
import checkLogin from "../middleware/checkLogin";
import checkToken from "../middleware/checkToken";
import updateInformation from "../middleware/updateInformation";
import createPost from "../middleware/createPost";
import postsByAuthor from "../middleware/postsByAuthor";
import deletePostById from "../middleware/deletePostById";
import updatePostById from "../middleware/updatePostById";

const router: Router = Router();

router.post("/users", checkRegistration, UserController.registration);
router.post("/login", checkLogin, UserController.login);
router.get("/information", checkToken, UserController.getAllInformation);
router.put("/information", checkToken, updateInformation, UserController.updateSomeInformation);
router.post("/posts", checkToken, createPost, UserController.createPost);
router.get("/posts/author", checkToken, postsByAuthor, UserController.showPostByAuthor);
router.delete("/posts/:id", checkToken, deletePostById, UserController.deletePostById);
router.put("/posts", checkToken, updatePostById, UserController.updatePostById);

export default router;
