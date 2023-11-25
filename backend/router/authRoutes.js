import {Router} from "express";
import {register,login,verifyEmail,generateOTP,localVariables,verifyOTP,resetPassword,createResetSession} from "../controllers/authController.js";
import sendMail from "../controllers/mailer.js";
const router=Router();

/**post routes */

router.post("/register",register);
router.post("/registerMail",sendMail);
router.post("/login",login);


/**get routes */
router.get("/generateOTP",verifyEmail,localVariables,generateOTP);
router.get("/verifyOTP",verifyOTP);
router.get("/createResetSession",createResetSession)

/**put routes */
router.put("/resetPassword",resetPassword);
export default router;