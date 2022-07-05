const jwt = require("jsonwebtoken");

exports.authCheck = async (req, res, next) => {
  if (req.headers.authorization) {
    try {
      let token = req.headers.authorization.split(" ")[1];
      let data = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.userId = data.userId
      req.userName = data.userName 
      next()
    } catch (err) {
      res.status(400).json({
        message: "Authorization failed",
      });
    }
  } else {
    res.status(400).json({
      message: "Authorization failed",
    });
  }
};
