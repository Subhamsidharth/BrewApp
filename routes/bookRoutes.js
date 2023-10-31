import express from "express"
import { verifyToken } from "../middlewares/auth.js"
import { createBook, deleteBook, getAllBooks, getSingleBook, updateBook } from "../controllers/bookControllers.js"
import { creatVal } from "../validate/validator.js"

const bookRouter = express.Router()

bookRouter.use(verifyToken)

bookRouter.post("/addBook", creatVal, createBook)
bookRouter.put("/updateBook/:id", updateBook)
bookRouter.delete("/deleteBook/:id", deleteBook)
bookRouter.get("/getBookById/:id", getSingleBook)
bookRouter.get("/getAllBooks", getAllBooks)

export default bookRouter