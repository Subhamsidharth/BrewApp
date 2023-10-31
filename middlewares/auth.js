import jwt from "jsonwebtoken"
import fs from "fs"
const verifyToken = (req, res, next) => {
    try {
        let authHead, token;
        authHead = req.headers.authorization;
        if (authHead && authHead.startsWith("Bearer")) {
            token = authHead.split(" ")[1];
            const privateKey = fs.readFileSync("./config/privateKey.key");
            jwt.verify(token, privateKey, { algorithms: ["RS256"] }, async (err, payload) => {
                if (err) {
                    return res.status(401).send({ status: false, msg: "Unauthorized" })
                }
                req.userInfo = payload.userId
                next()
            })
        }
        else{
            return res.status(400).send({ status: false, msg: "Token not provided" })
        }
    } catch (error) {
        return res.send({ status: 0, response: error.message })
    }
}

export { verifyToken }