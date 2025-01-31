import { Router } from "express";
import { getCollectorByEmail, loginCollector, logoutCollector, registerCollector } from "../controllers/collector.controller";
import { verifyCollectorJwt } from "../middleware/authC.middleware";
import { acceptedPickUpRequest } from "../controllers/collector.controller";
const router = Router();

router.route("/sign-up").post(registerCollector);
router.route("/sign-in").post(loginCollector);
router.route("/logout").post(verifyCollectorJwt ,logoutCollector);
router.route("/get-collector").get(verifyCollectorJwt , getCollectorByEmail);
router.route("/collector-acceptRequest").get(verifyCollectorJwt , acceptedPickUpRequest);


export default router