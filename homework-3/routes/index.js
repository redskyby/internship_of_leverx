const Router = require("express");
const userRoutes = require("./userRoutes");
const router = Router();

router.use("/user", userRoutes);

module.exports = router;
