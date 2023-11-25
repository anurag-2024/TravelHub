import { Router } from "express";
import * as userController from "../controllers/userController.js";
import {verifyUser,verifyAdmin} from "../utilis/verifyToken.js";
const router = Router();

/** post routes */
router.post("/user", userController.createUser)

/**put routes */
router.put("/updateUser/:id",verifyUser, userController.updateUser)

/**get routes */
router.get("/getUser/:id",verifyUser, userController.getUser)
// router.get("/getAllUsers",verifyAdmin, userController.getAllUsers)
router.get("/getallusers",userController.getAllUsers)
/**delete routes */
router.delete("/deleteUser/:id",verifyUser, userController.deleteUser)
export default router;