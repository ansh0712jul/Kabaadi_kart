import { Router } from "express";
import { getPickUpRequest, makePickUprequest } from "../controllers/pickRequest.controller";
import { verifyJwt } from "../middleware/auth.middleware";
const router  = Router();


router.route("/make-pickup-request").post(makePickUprequest)
router.route("/get-pickup-request").get(verifyJwt , getPickUpRequest)
    


export default router