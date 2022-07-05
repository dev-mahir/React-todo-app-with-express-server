const mongoose = require("mongoose");

// User Schema
const todoSchema = mongoose.Schema(
  {
    title: {
        type: String,
        required: true
    },
    todoEnd: {
        type: Date
    }
,
    status: {
        type: String,
        enum: ['new', 'inactive', 'active', 'complete'],
        default: 'new'
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// User Model
const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
