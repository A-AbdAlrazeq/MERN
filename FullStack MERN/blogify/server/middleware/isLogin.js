const jwt = require("jsonwebtoken");
const User = require("../models/User/User");
const isLogin = (req, res, next) => {
  //Get token from header
  const token = req.headers.authorization?.split(" ")[1];
  console.log(token);
  //? Verify the token
  jwt.verify(token, "anykey", async (err, decoded) => {
    //add user to req obj
    //get the user id
    const userId = decoded?.user?.id;
    const user = await User.findById(userId).select("username email role _id");
    //save user into req obj
    req.userAuth = user;
    if (err) {
      return "Invalid token";
    } else {
      next();
    }
  });
};
module.exports = isLogin;
