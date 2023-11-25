import {Router} from "express";
import {createReview} from "../controllers/reviewController.js";
import {verifyUser} from "../utilis/verifyToken.js";
const router=Router();

/**post routes */
router.post("/review/:tourId",verifyUser,createReview);

export default router;