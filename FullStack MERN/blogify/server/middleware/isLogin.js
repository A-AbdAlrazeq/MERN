const jwt = require("jsonwebtoken");
const User = require("../models/User/User");
const isLogin = (req, res, next) => {
  //Get token from header
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];
  if (!token) {
    return next(Object.assign(new Error("Not authorized, no token"), { statusCode: 401 }));
  }
  //? Verify the token
  jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
    if (err || !decoded?.user?.id) {
      return next(
        Object.assign(new Error("token expired/invalid"), {
          statusCode: 401,
        })
      );
    }
    const userId = decoded.user.id;
    const user = await User.findById(userId).select("username email role _id");
    if (!user) {
      return next(Object.assign(new Error("User not found"), { statusCode: 401 }));
    }
    //save user into req obj
    req.userAuth = user;
    next();
  });
};
module.exports = isLogin;
