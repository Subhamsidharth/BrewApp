import Book from "../models/bookSchema.js";

const createBook = async (req, res) => {
    try {
        const { title, author, summary } = req.body;
        const data = { title, author, summary };

        data.userId = req.userInfo
        const bookInfo = await Book.create(data)
        if (bookInfo) {

            return res.status(201).send({ status: true, msg: "Successfully created one book" });
        }
        return res.status(400).send({ status: false, msg: "Something went wrong" });
    } catch (error) {
        return res.status(500).send({ error: error.messsage })
    }
}

const updateBook = async (req, res) => {
    try {
        const { title, author, summary } = req.body;
        const { id } = req.params;
        const data = { title, author, summary };

        const checkExist = await Book.findById({ _id: id })
        if (!checkExist) {
            return res.status(404).status({ status: false, msg: "Not found" })
        }
        if (checkExist.userId.toString() !== req.userInfo) {
            return res.status(403).status({ status: false, msg: "Access denied" })
        }
        const bookInfo = await Book.findByIdAndUpdate({ _id: id }, data)
        if (bookInfo.modifiedCount !== 0 && bookInfo.matchedCount !== 0) {

            return res.status(201).send({ status: true, msg: "Successfully updated one book" });
        }
        return res.status(400).send({ status: false, msg: "Something went wrong" });
    } catch (error) {
        return res.status(500).send({ error: error.messsage })
    }
}

const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;

        const checkExist = await Book.findById({ _id: id })
        if (!checkExist) {
            return res.status(404).status({ status: false, msg: "Not found" })
        }
        if (checkExist.userId.toString() !== req.userInfo) {
            return res.status(403).status({ status: false, msg: "Access denied" })
        }
        const bookInfo = await Book.findByIdAndUpdate({ _id: id }, { status: 0 })
        if (bookInfo.modifiedCount !== 0 && bookInfo.matchedCount !== 0) {

            return res.status(201).send({ status: true, msg: "Successfully deleted one book" });
        }
        return res.status(400).send({ status: false, msg: "Something went wrong" });
    } catch (error) {
        return res.status(500).send({ error: error.messsage })
    }
}


const getSingleBook = async (req, res) => {
    try {
        const { id } = req.params;

        const bookInfo = await Book.findById({ _id: id })
        if (!bookInfo) {
            return res.status(404).status({ status: false, msg: "Not found" })
        }
        return res.status(200).send({ status: true, data: bookInfo });
    } catch (error) {
        return res.status(500).send({ error: error.messsage })
    }
}

const getAllBooks = async (req, res) => {
    try {
        const bookInfo = await Book.find()
        return res.status(200).send({ status: true, data: bookInfo });
    } catch (error) {
        return res.status(500).send({ error: error.messsage })
    }
}


export {createBook,updateBook,deleteBook,getSingleBook,getAllBooks}
