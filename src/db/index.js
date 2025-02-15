import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        const connectionInstance =  await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\nMONGODB_Connection !!db Host: ${connectionInstance.connection.host}`);
    }
    catch (error) {
        console.log("MONGODB_Connection error", error)
        process.exit(1);
    }
}


export default connectDB;