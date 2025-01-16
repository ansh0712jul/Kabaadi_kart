import { Router } from "express";
import {registerUser , loginUser, logoutUser , refreshAccessToken} from "../controllers/user.controller"
import { verifyJwt } from "../middleware/auth.middleware";

const router = Router();

router.route("/sign-up").post(registerUser)
router.route("/sign-in").post(loginUser)

// secured routes
router.route("/logout").post(verifyJwt , logoutUser)
router.route("/refresh-token").post( refreshAccessToken )

export default router