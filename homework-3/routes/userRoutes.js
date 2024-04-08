const Router = require("express");
const UserController = require("../controllers/userController");
const checkRegistration = require("../middleware/checkRegistration");
const checkLogin = require("../middleware/checkLogin");
const checkToken = require("../middleware/checkToken");
const updateInformation = require("../middleware/updateInformation");
const createPost = require("../middleware/createPost");
const showPostByAuthor = require("../middleware/postsByAuthor");
const deletePostById = require("../middleware/deletePostById");

const router = Router();
// http://localhost:5000/api/user
router.post("/registration", checkRegistration, UserController.registration);
router.post("/login", checkLogin, UserController.login);
router.get("/getAllInformations", checkToken, UserController.getAllInformation);
router.put("/updateInformation", updateInformation, UserController.updateSomeInformation);
router.post("/createPost", createPost, UserController.createPost);
router.get("/showPostsByAuthor", showPostByAuthor, UserController.showPostByAuthor);
router.delete("/deletePostById", deletePostById, UserController.deletePostById);

module.exports = router;
