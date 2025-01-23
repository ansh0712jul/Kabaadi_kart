import { Router } from "express";
import { loginCollector, logoutCollector, registerCollector } from "../controllers/collector.controller";
import { verifyCollectorJwt } from "../middleware/authC.middleware";
const router = Router();

router.route("/sign-up").post(registerCollector);
router.route("/sign-in").post(loginCollector);
router.route("/logout").post(verifyCollectorJwt ,logoutCollector);


export default router