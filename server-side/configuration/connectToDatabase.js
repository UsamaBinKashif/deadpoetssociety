const dotenv = require("dotenv");
const mongoose = require("mongoose");

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
