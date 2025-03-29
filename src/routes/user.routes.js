import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(
    upload.fields([
        {name:"avatar",maxCount:1},
        {name:"coverImage",maxCount:1} //error occur
    ]),
    registerUser
)

router.route("/login").post(loginUser)



//Secure routes
router.route("/logout").post(verifyJWT, logoutUser)


export default router;