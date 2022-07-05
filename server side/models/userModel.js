const mongoose = require("mongoose");

// User Schema
const UserSchema = mongoose.Schema(
  {
    name:{
        type: String
    },
    email:{
        type: String
    },
    password: {
        type: String,
        trim: true

    },
    username: {
        type: String,
        lowercase: true
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// User Model
const User = mongoose.model("User", UserSchema);

module.exports = User;
