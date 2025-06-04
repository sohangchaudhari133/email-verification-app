import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    lastLogin: {
        type:Date,
        default:Date.now()
    },
    resetPasswordToken:String,
    resetPasswordExpiresAt:Date,
    verificationToken:String,
    verificationTokenExpiresAt:Date,
}, {
    timestamps: true,
});

export const User = mongoose.model('User', userSchema);

