import fs from "fs"
import path from "path"
import dotenv from "dotenv"
import { fileURLToPath } from 'url';
import { dirname } from 'path'; 

const __filename = fileURLToPath(import.meta.url);

dotenv.config()
const __dirname = dirname(__filename);
let paths = path.join(__dirname,"/config.json")
const config = JSON.parse(fs.readFileSync(paths, 'utf-8'))

let CONFIG = {}

CONFIG.PORT = (process.env.PORT || config.port);
CONFIG.DB_URL = `mongodb+srv://${config.mongodb.username}:${config.mongodb.password}@cluster0.f3bng.mongodb.net/${config.mongodb.database}?retryWrites=true&w=majority`;
CONFIG.SMTP_PORT = process.env.SMTP_PORT
CONFIG.SMTP_AUTH = { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }

export default CONFIG
