import { Router } from "express";
import { registerCollector } from "../controllers/collector.controller";

const router = Router();

router.route("/sign-up").post(registerCollector);

export default router