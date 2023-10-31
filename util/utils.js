import nodemailer from "nodemailer"
import CONFIG from "../config/config.js"

const otpGenerate = () => {
    let otp = Math.random().toString().substring(2, 8)
    if (otp.length !== 6) {
        otpGenerate()
    } else {
        return otp
    }
}

const transporter = nodemailer.createTransport({
    port:587,
    pool: true,
    maxConnections: 3,
    maxMessages: 100,
    service: "gmail",
    auth: CONFIG.SMTP_AUTH
})


const sendEmail = (userInfo) =>{
    try {
        if (userInfo) {
            const link = `http://localhost:4000/user/verifyOtp/${userInfo._id}`;
    
           const mailOptions = {
             from: CONFIG.SMTP_AUTH.user,
             to: userInfo.email,
             subject: "Verification OTP",
             html: `<b>Your otp:<strong>${userInfo.otp}</strong>,<br> Click here to verify :\n<a href=${link}>clickhere</small></p>`,
           };
    
           transporter.sendMail(mailOptions, (error, info) => {
             if (error) {
              console.log({ status: 0, response: "Can't send OTP",error });
             } else {
              console.log({
                 status: 1,
                 response: `Verification email send to ${userInfo.email}`,
                 Link: link,
               });
             }
           });
         } else {
          console.log({ status: 0, response: "can't send otp" });
         }
    } catch (error) {
        console.log(error.message);
    }
   
}

export { otpGenerate, sendEmail }