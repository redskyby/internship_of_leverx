import { Router } from "express";
import userRoutes from "./userRoutes";
const router: Router = Router();

router.use("/user", userRoutes);

export default router;
