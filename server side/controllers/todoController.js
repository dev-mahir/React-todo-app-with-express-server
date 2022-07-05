// Imports Admin Model
const Todo = require("../models/todoModel");


//  Create todo
exports.createTodo = async (req, res) => {
  try {
    const data = await Todo.create( req.body );
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({
      message: err,
    });
    console.log(err);
  }
};


 

// Read todo
exports.readTodo = async (req, res) => {
    try {
      let data = await Todo.find();
      if (Todo.length > 0) {
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
      console.log(e);
    }
  };
  




// Update Todo
exports.updateTodo = async (req, res) => {
  try {
    const data = await Todo.findByIdAndUpdate(req.params.id,   req.body, {
        new: true
    });
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
};



// Delete todo
exports.deleteTodo = async (req, res) => {
  try {
    const data = await Todo.findByIdAndDelete(req.params.id)
    res.status(201).json(
      data
    );
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
};


// Update todo status 
exports.updateTodoStatus = async (req, res) => {
    try {
      const data = await Todo.findByIdAndUpdate(req.params.id,   {
        ...req.body,
        status: req.body.status
      }, {
          new: true
      });
      res.status(201).json(data);
    } catch (err) {
      res.status(400).json({
        message: err,
      });
    }
  };



  // Select todo by status
exports.selectTodoByStatus = async (req, res) => {
    try {
      let data = await Todo.find({status: req.body.status});

      if (Todo.length > 0) {
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
      console.log(e);
    }
  };


  // Select todo by date
exports.selectTodoByDate = async (req, res) => {

    let formDate = new Date(req.body.formDate)
    let toDate = new Date( req.body.toDate)
        try {
      let data = await Todo.find({createdAt: { $gte:formDate, $lte: toDate } });

      if ( data.length > 0) {
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
      console.log(err);
    }
  };