import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import { otpGenerate, sendEmail } from "../util/utils.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";
import fs from "fs"

const userRegister = async (req, res) => {
    try {
        const { username, password, email, age, street, city, pincode } = req.body;

        const checkExist = await User.findOne({ email: email })
        if (checkExist) {
            return res.status(409).send({ msg: "User with same email already exist" })
        }
        const hashPass = await bcrypt.hash(password, 10);
        const otp = otpGenerate();
        const userInfo = await User.create({ username, password: hashPass, email, age, "address.street": street, "address.city": city, "address.pincode": pincode, otp });
        if (userInfo) {

            sendEmail(userInfo)
            return res.status(201).send({ status: true, msg: "Successfully registered,Please verify otp" });
        }
        return res.status(400).send({ status: false, msg: "Something went wrong" });
    } catch (error) {
        return res.status(500).send({ error: error.messsage })
    }
}


const verifyOtp = async (req, res) => {
    try {
        const { id } = req.params;
        const { otp } = req.body;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).send({ status: false, msg: "not a Valid ObjectId" })
        }
        const checkExist = await User.findById({ _id: id })
        if (!checkExist) {
            return res.status(404).send({ status: false, msg: "Not found" })
        } else {
            if (checkExist.status === 2) {
                return res.status(400).send({ status: false, msg: "Already verified" })
            }
            if (checkExist.otp !== otp) {
                return res.status(409).send({ status: false, msg: "Otp mismatch" })
            }
            await User.findByIdAndUpdate({ _id: checkExist._id }, { status: 2 })
            return res.status(200).send({ status: true, msg: "successfully verified" })
        }
    } catch (error) {
        return res.status(500).send({ error: error.messsage })
    }
}


const userLogin = async (req, res) => {
    try {
        const { password, email } = req.body;
        const checkExist = await User.findOne({ email: email })
        if (!checkExist) {
            return res.status(409).send({ status: false, msg: "User not found" })
        }
        if (checkExist.status !== 2) {
            return res.status(409).send({ status: false, msg: "Yo need to verify your account, inorder to login" })
        }
        const matchPass = await bcrypt.compare(password, checkExist.password)
        if (matchPass === false) {
            return res.status(400).send({ status: false, msg: "passsword deosn't match" })
        }
        const privateKey = fs.readFileSync("./config/privateKey.key");
        const token = jwt.sign(
            { userId: checkExist._id, email: checkExist.email },
            privateKey,
            { algorithm: "RS256", expiresIn: "2h" }
        );
        return res.status(200).send({ status: true, msg: "Successfully logged In", data: token })

    } catch (error) {
        return res.status(500).send({ error: error.messsage })
    }
}

export { userRegister, userLogin, verifyOtp }
