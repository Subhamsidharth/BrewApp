import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        require: true,
        trim: true
    },
    age: {
        type: Number,
        require: true
    },
    address: {
        street: {
            type: String,
            required: true,
            trim: true
        },
        city: {
            type: String,
            required: true,
            trim: true
        },
        pincode: {
            type: Number,
            required: true
        }
    },
    otp: {
        type: String,
        length: 6
    },
    status:{
        type:Number,
        default:2
    }
}, {
    timestamps: true,
    versionKey: false
})

export default mongoose.model("user", userSchema)