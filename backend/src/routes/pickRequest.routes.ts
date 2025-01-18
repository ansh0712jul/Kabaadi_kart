import { Router } from "express";
import { makePickUprequest } from "../controllers/pickRequest.controller";
const router  = Router();


router.route("/make-pickup-request").post(makePickUprequest)

export default router