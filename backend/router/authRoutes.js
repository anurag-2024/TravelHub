import {Router} from "express";
import {register,login,verifyEmail,generateOTP,localVariables,verifyOTP,resetPassword,createResetSession,confirmEmail,EmailVerify} from "../controllers/authController.js";
import sendMail from "../controllers/mailer.js";
const router=Router();

/**post routes */

router.post("/register",register);
router.post("/registerMail",sendMail);
router.post("/login",login);
router.post("/verifyEmail",EmailVerify);

/**get routes */
router.get("/generateOTP",verifyEmail,localVariables,generateOTP);
router.get("/verifyOTP",verifyOTP);
router.get("/createResetSession",createResetSession);


/**put routes */
router.put("/resetPassword",resetPassword);
router.put("/confirmEmail",confirmEmail);
export default router;