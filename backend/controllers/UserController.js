// import User from "../models/userModel.js";
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const userid = require("./test");
const Mongoose = require("mongoose");

//Last register User ID
const getuserid = asyncHandler(async(req, res) => {
    // const users = {};
    const id = await User.findOne().sort({ _id: -1 }).limit(1).select("_id");
    // const myjson = JSON.stringify(user);
    // const a = JSON.stringify(user);
    // const myjson = JSON.parse(user);
    // const a = JSON.stringify(user);
    // console.log(user);
    // console.log(myjson);
    // console.log(typeof myjson);
    res.send(id);
});

//Get id from python

const getIdFromPython = asyncHandler(async(req, res, next) => {
    res.locals.resp = req.body.data;

    // var iid = new Mongoose.Types.ObjectId(id);
    // var id = Mongoose.Types.ObjectId(data);
    // const id = JSON.parse(data);
    const user = await User.findById(res.locals.resp);
    console.log(user);
    // console.log(typeof iid);
    // if (resp) {
    //   res.json({
    //     resp,
    //   });
    //   console.log(resp);
    // }
    next();
});

//face recognize user
const faceRecognizeUser = asyncHandler(async(req, res) => {
    const user = getIdFromPython();
    // var id = mongoose.Types.ObjectId(data);
    // if (res.locals.resp) {
    //   console.log(res.locals.resp);
    // }
    // console.log(typeof id);
    // console.log(data);
    // const resp = req.resp;
    console.log(user);
    res.json({
        resp,
    });
});

//@desc  Auth user && get token
//@route POST/api/users/login
//@access Public
const authUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

const registerUser = asyncHandler(async(req, res) => {
    const { name, email, password, age, sex, status } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({
        // _id: py_id,
        name,
        email,
        password,
        age,
        sex,
        status,
    });
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            sex: user.sex,
            status: user.status,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("User Not Created Invalid user data");
    }
});

//Get all the user info
const getAllUser = asyncHandler(async(req, res) => {
    const users = await User.find({}).select("-password");
    res.json(users);
});

// const getIdFromPython = asyncHandler(async (req, res) => {
//   const spawn = require("child_process").spawn;
//   // console.log("test path");
//   const pythonProcess = spawn("python", [
//     "../../Face Recognition/connector.py",
//   ]);
//   pythonProcess.stdout.on("data", (data) => {
//     mystr = data.toString();
//     console.log(mystr);

//     myjson = JSON.parse(mystr);
//     console.log(myjson.id);
//   });
// });

//Get User by Id

const getSingleUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id); //Id comes from python and sent from react
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            age: user.age,
            sex: user.sex,
            status: user.status,
        });
    } else {
        res.status(404);
        throw new Error("User not Found");
    }
});

//Get all Covid affected user

const getAffectedUsers = asyncHandler(async(req, res) => {
    const users = await User.find({})
        .where("status")
        .equals("Infected")
        .select("-password");
    if (users) {
        res.json(users);
    }
});

//@desc  update user
//@route PUT/api/users/:id
//@access private/admin

const updateUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = req.body.isAdmin;
        user.status = req.body.status || user.status;
        user.age = req.body.age || user.age;
        user.sex = req.body.sex || user.sex;

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            status: updatedUser.status,
            age: updatedUser.age,
            sex: updatedUser.sex,
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

//@desc Detete users
//@route DELETE/api/users/:id
//@access private/admin

const deleteUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        await user.remove();
        res.json({ message: "User Removed" });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
    res.json(users);
});

module.exports = {
    registerUser,
    authUser,
    getSingleUser,
    getAllUser,
    getAffectedUsers,
    updateUser,
    deleteUser,
    getuserid,
    faceRecognizeUser,
    getIdFromPython,
};