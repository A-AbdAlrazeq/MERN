const isLogin = (req, res, next) => {
  console.log("is Login Middleware");
  //Get token from header
  //? Verify the token
  //get the user id
  //save user into req obj
  next(); //to execute getProfile in router
};

module.exports = isLogin;
