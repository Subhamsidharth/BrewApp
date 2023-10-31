import mongoose from "mongoose";


const ObjectId = mongoose.Types.ObjectId
const bookSchema = mongoose.Schema({
    userId:{
        type:ObjectId,
        require:true,
        ref:"user"
    },

    title: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    summary: {
        type: String,
        require: true
    },
    status:{
        type:Number,
        default:1
    }
},
{
    timestamps:true,
    versionKey:false
})

export default mongoose.model("book", bookSchema)