import {Router} from "express";
import { verifyUser } from "../utilis/verifyToken.js";
import {pendingBooking,confirmBooking,getBooking,getAllBooking,makePayment,getUserBooking} from "../controllers/bookingController.js";
const router=Router();

/**post routes */
router.post("/booking/pending",pendingBooking);
router.post("/create-checkout-session",verifyUser,makePayment);

/**get routes */
router.get("/booking/:id",verifyUser,getBooking);
router.get("/booking",verifyUser,getAllBooking);
router.get("/userbooking/:id",verifyUser,getUserBooking);

/**put routes */
router.put("/booking/confirm/:bookingId",confirmBooking);
export default router;