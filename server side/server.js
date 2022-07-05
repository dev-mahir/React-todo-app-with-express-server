// External imports 
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const cors = require('cors');
const app = express();

// Internal import 
const userRouter = require('./routes/userRoutes');
const todoRouter = require('./routes/todoRoutes');



// Request parser 
app.use( express.json())
app.use( express.urlencoded({extended:false}))

// Security package implement 
app.use( cors())




// Internal imports 
const connectDB = require('./config/db');


// Mongodb connection 
connectDB();



// Api routing
app.use('/api/user', userRouter)
app.use('/api/todo', todoRouter)






// Server listening 
const port = process.env.PORT
app.listen(port, ()=> {
    console.log(`server is running at http://localhost:${port}`.bgGreen.black);
});