import { Router } from "express";
import * as tourController from "../controllers/tourController.js";
import {verifyAdmin} from "../utilis/verifyToken.js";
const router = Router();

/** post routes */
router.post("/tour", verifyAdmin, tourController.createTour)
router.post("/updatetour/:id", verifyAdmin,tourController.updateTour)

/**get routes */
router.get("/gettour/:id", tourController.getTour)
router.get("/getAlltours", tourController.getAllTours)
router.get("/search/getTourBySearch",tourController.getTourBySearch)
router.get("/search/getFeaturedtour",tourController.getFeaturedTours)
router.get("/search/getTourCount",tourController.getTourCount)


/**delete routes */
router.delete("/deletetour/:id",verifyAdmin, tourController.deleteTour)
export default router;