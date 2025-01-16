import { Router } from "express";
import {registerUser , loginUser, logoutUser} from "../controllers/user.controller"
import { verifyJwt } from "../middleware/auth.middleware";

const router = Router();

router.route("/sign-up").post(registerUser)
router.route("/sign-in").post(loginUser)

// secured routes
router.route("/logout").post(verifyJwt , logoutUser)

export default router