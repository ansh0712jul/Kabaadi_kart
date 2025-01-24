import { Router } from "express";
import { acceptPickUpRequest, cancelPickUpRequest, completePickUpRequest, getPickUpRequest, makePickUprequest } from "../controllers/pickRequest.controller";
import { verifyJwt } from "../middleware/auth.middleware";
import { upload } from "../middleware/multer.middleware";
import { verifyCollectorJwt } from "../middleware/authC.middleware";
const router  = Router();


router.route("/make-pickup-request").post(
    upload.single("img"),
    makePickUprequest)

router.route("/get-pickup-request").get(verifyJwt,  getPickUpRequest)
router.route("/pickup-request/:requestId/accept").patch(verifyCollectorJwt, acceptPickUpRequest)
router.route("/pickup-request/:requestId/complete").patch(verifyCollectorJwt, completePickUpRequest)
router.route("/pickup-request/:requestId/reject").patch(verifyCollectorJwt, cancelPickUpRequest)
    


export default router