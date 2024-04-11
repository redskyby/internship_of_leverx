import { Router } from "express";
import postController from "../controllers/postController";
import checkToken from "../middleware/checkToken";
import createPost from "../middleware/createPost";
import postsByAuthor from "../middleware/postsByAuthor";
import deletePostById from "../middleware/deletePostById";
import updatePostById from "../middleware/updatePostById";
import validationResult from "../middleware/validationResult";

const router: Router = Router();

router.post("/posts", checkToken, createPost, validationResult, postController.createPost);
router.get("/posts/author", checkToken, postsByAuthor, validationResult, postController.showPostByAuthor);
router.delete("/posts/:id", checkToken, deletePostById, validationResult, postController.deletePostById);
router.put("/posts", checkToken, updatePostById, validationResult, postController.updatePostById);

export default router;
