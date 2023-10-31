import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan"
import userRouter from "./routes/userRoutes.js";
import fs from "fs"
import bookRouter from "./routes/bookRoutes.js";
import CONFIG from "./config/config.js";
import bodyParser from "body-parser";
const loadJSON = (path) => JSON.parse(fs.readFileSync(new URL(path, import.meta.url)));
const CONFIGJSON = loadJSON('./config/config.json');

const app = express(); // Initializing ExpressJS
app.use(express.json())

app.use(bodyParser.json())

app.use(cors({
    credentials: true,
    origin: CONFIGJSON.settings.uiUrl,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Origin", "X-Requested-with", "Content-Type", "Accept", "Authorization"],
}))


mongoose.connect(CONFIG.DB_URL, { useNewUrlParser: true })
    .then(() => {
        console.log("Mongodb is connected successfully.✔🟢✅");
    })
    .catch((err) => {
        console.log(err)
    })


app.use("/user", userRouter)
app.use("/book", bookRouter)

app.use(morgan(
    function (tokens, req, res) {

        if (tokens.method(req, res) == 'POST') {
            return [
                tokens.method(req, res),
                tokens.url(req, res),
                tokens.status(req, res),
                tokens.res(req, res, 'content-length'), '-',
                JSON.stringify(req.body), '-',
                tokens['response-time'](req, res), 'ms',
                new Date().toJSON()
            ].join(' ')
        }
        else {
            return [
                tokens.method(req, res),
                tokens.url(req, res),
                tokens.status(req, res),
                tokens.res(req, res, 'content-length'), '-',
                tokens['response-time'](req, res), 'ms',
                new Date().toJSON()
            ].join(' ')
        }
    }
))

app.listen(process.env.PORT || 3000, () => {
    return console.log(`Express is running on port 🤣 ${process.env.PORT || 3000}`)
});