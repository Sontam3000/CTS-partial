// const User = require("../models/userModel");
// // const asyncHandler = require("express-async-handler");
// // const generateToken = require("../utils/generateToken");

// function userid() {
//   const spawn = require("child_process").spawn;

//   var result = "";
//   const pythonProcess = spawn("python", [
//     "../../Face Recognition/connector.py",
//   ]);
//   pythonProcess.stdout.on("data", (data) => {
//     result += data.toString();
//     myjson = JSON.parse(result);
//     iid = myjson.id;
//   });
//   pythonProcess.stdout.on("end", function () {
//     var newresult = {
//       iid: iid,
//     };
//     console.log(newresult);
//     console.log(User.findById(iid));
//   });
// }

// userid();

// module.exports = userid;

var express = require("express");
const User = require("../models/userModel");
// const connectDB = require("../config/db");
var app = express();

app.use(express.json());
// connectDB();
app.post("/getidfrompython", (req, res) => {
  // Retrieve array form post body
  var data = req.body.data;
  console.log(data);
  const resp = User.findOne({ _id: { $in: data } });
  console.log(resp);

  // Return json response
  //   res.json({ result: sum });
});

// Server listening to PORT 3000
