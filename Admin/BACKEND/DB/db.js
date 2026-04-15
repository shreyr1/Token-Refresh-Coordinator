import mongoose from "mongoose";
import 'dotenv/config'

async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
}

export default connect;
