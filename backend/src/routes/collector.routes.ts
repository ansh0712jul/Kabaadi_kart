import { Router } from "express";
import { loginCollector, registerCollector } from "../controllers/collector.controller";

const router = Router();

router.route("/sign-up").post(registerCollector);
router.route("/sign-in").post(loginCollector);


export default router