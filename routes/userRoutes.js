import express from "express"
import { userLogin, userRegister, verifyOtp } from "../controllers/userControllers.js"
import { userLogVal, userRegiVal, userVerify } from "../validate/validator.js"

const userRouter = express.Router()

userRouter.post("/register", userRegiVal, userRegister)
userRouter.post("/verifyOtp/:id",userVerify,verifyOtp)
userRouter.post("/login",userLogVal,userLogin)

export default userRouter