// import express from "express";
// import registerUser from "../controllers/UserController";
const express = require("express");

const {
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
} = require("../controllers/UserController.js");

const { admin, protect } = require("../middleware/authMiddleware");

// const authUser = require("../controllers/UserController.js");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", authUser);
router.get("/singleuser/:id", protect, admin, getSingleUser);
router.get("/alluser", protect, getAllUser);
router.get("/affecteduser", getAffectedUsers);
router.get("/userid", getuserid); //Sending Latest register ID
router.post("/getidfrompython", getIdFromPython);

router.get("/facerecognizeuser", faceRecognizeUser); //Recognized user detail
router.put("/update/:id", protect, admin, updateUser);
router.delete("/delete/:id", protect, admin, deleteUser);

module.exports = router;