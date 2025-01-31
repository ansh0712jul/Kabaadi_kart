import { Router } from "express";
import { getCollectorByEmail, loginCollector, logoutCollector, registerCollector } from "../controllers/collector.controller";
import { verifyCollectorJwt } from "../middleware/authC.middleware";
const router = Router();

router.route("/sign-up").post(registerCollector);
router.route("/sign-in").post(loginCollector);
router.route("/logout").post(verifyCollectorJwt ,logoutCollector);
router.route("/get-collector").get(verifyCollectorJwt , getCollectorByEmail);


export default router