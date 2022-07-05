// External imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Imports Admin Model
const User = require("../models/UserModel");


// User sign up 
exports.userSignup = async (req, res) => {
  try {
    let u_name = req.body.name;
            u_name = u_name.split(' ').join("-")

    let password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      username: u_name
    });
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({
      message: err,
    });
    console.log(err);
  }
};




// User login
exports.userLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      let data = await User.findOne({ email: email });

      if (!data) {
        res.status(400).json({
          message: "Invalid email",
        });
      } else {
        if  ( await bcrypt.compare(password, data.password )) {

          let token = jwt.sign({ userId: data.id, userName: data.username}, process.env.JWT_SECRET_KEY, {
            expiresIn: "1d",
          });
  
          res.status(200).json({ data: data, token: token });
    
        } else {
          res.status(400).json({
            message: "Password Invalid",
          });
        }
      }
    } catch (err) {
      res.status(400).json({
        "message": "There was a server side error",
      });
    }
  };
  


// Read User
exports.readUser = async (req, res) => {
    
    try {
      let data = await User.find();
      if (data.length > 0) {
        res.status(200).json(data);
      } else {
        res.status(404).json({
          message: "Data not found",
        });
      }
    } catch (err) {
      res.status(500).json({
        message: "There was a server side error",
      });
    }
  };
  




// Update user
exports.updateUser = async (req, res) => {
    let u_name = req.body.name;
            u_name = u_name.split(' ').join("-")
            
    let password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const data = await User.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        username: u_name
    }, {
      new: true,
    });
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({
      message: err,
    });
    console.log(err);
  }
};



// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const data = await User.findByIdAndDelete(req.params.id)
    res.status(201).json(
      data
    );
  } catch (err) {
    res.status(204).json({
      message: err,
    });
  }
};



