import { Router } from "express";
import UserController from "../controllers/userController";
import checkRegistration from "../middleware/checkRegistration";
// const checkLogin = require("../middleware/checkLogin");
// const checkToken = require("../middleware/checkToken");
// const updateInformation = require("../middleware/updateInformation");
// const createPost = require("../middleware/createPost");
// const showPostByAuthor = require("../middleware/postsByAuthor");
// const deletePostById = require("../middleware/deletePostById");
// const updatePostById = require("../middleware/updatePostById");

const router: Router = Router();
// http://localhost:5000/api/user
router.post("/users", checkRegistration, UserController.registration);
// router.post("/login", checkLogin, UserController.login);
// router.get("/information", checkToken, UserController.getAllInformation);
// router.put("/information", checkToken, updateInformation, UserController.updateSomeInformation);
// router.post("/posts", checkToken, createPost, UserController.createPost);
// router.get("/posts/author", checkToken, showPostByAuthor, UserController.showPostByAuthor);
// router.delete("/posts/:id", checkToken, deletePostById, UserController.deletePostById);
// router.put("/posts", checkToken, updatePostById, UserController.updatePostById);

export default router;
