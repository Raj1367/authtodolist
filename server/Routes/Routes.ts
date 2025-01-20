import express from "express"
import userSignUpController from "../Controller/userSignup"
import userLogoutController from "../Controller/UserLogout"
import checkAuth from "../Controller/UserCheckAuth"
import userloginController from "../Controller/UserLogin"
import { isAuthenticated } from "../Middleware/isAuthenticated"


const router = express.Router()

// routes
router.post("/signup", userSignUpController)
router.post("/login", userloginController)
router.get("/logout", userLogoutController)
router.get("/check-auth",isAuthenticated, checkAuth);

export default router