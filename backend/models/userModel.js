// import mongoose from 'mongoose';
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const userSchema = mongoose.Schema({
    // _id: Number,
    // id: { type: String, default: uuidv4() },
    // _id: mongoose.ObjectId,

    // pId: Number,
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: String,
        required: true,
    },
    sex: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        // required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    image: {
        type: String,
        // required: true,
    },
}, {
    timestamps: true,
});

userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// const User = mongoose.model("User", userSchema);
// export default User;
module.exports = mongoose.model("User", userSchema);