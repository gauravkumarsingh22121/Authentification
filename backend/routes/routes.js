import express, { Router } from "express"
import { login, logout, signUP,getUserData } from "../controllers/auth.controllers.js"
import { upload } from "../middlewares/multer.js"
import { checkAuth } from "../middlewares/checkAuth.js"
const authRouter=express(Router())
authRouter.post("/signup",upload.single("profileImage"),signUP)
authRouter.post("/login",login)
authRouter.post("/logout",logout)
authRouter.get("/getuserdata",checkAuth,getUserData)
export default authRouter