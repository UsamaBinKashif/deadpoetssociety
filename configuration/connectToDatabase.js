const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

async function connectToDatabase() {
  try {
    const con = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connection Established, ${con.connection.host}`);
  } catch (e) {
    console.log(`Error while connectings to databse!, ${e.message}`);
  }
}

module.exports = connectToDatabase;
