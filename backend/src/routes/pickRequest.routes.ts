import { Router } from "express";
import { getPickUpRequest, makePickUprequest } from "../controllers/pickRequest.controller";
import { verifyJwt } from "../middleware/auth.middleware";
import { upload } from "../middleware/multer.middleware";
const router  = Router();


router.route("/make-pickup-request").post(
    upload.single("img"),
    makePickUprequest)

router.route("/get-pickup-request").get(verifyJwt,  getPickUpRequest)
    


export default router