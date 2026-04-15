import mongoose from "mongoose";
import 'dotenv/config'
async function connect() {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");
    }cathc(err){
        console.log(err);
    }
}

export default connect;
