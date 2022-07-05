const mongoose = require("mongoose");

const url = process.env.MONGODB_URL;
const connectDB = async () => {
  try {
    let connect = await mongoose.connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      autoIndex: true, 
    });
    console.log(
      `database connection success. Host: ${connect.connection.host}`.bgBlue
        .black
    );
  } catch (e){
    console.log(`database connection fail.`.bgRed,);
  }
};

module.exports = connectDB;
