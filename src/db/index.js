import mongoose from "mongoose";
import {DB_NAME} from "../constants.js";


// const connect = async()=>{
//     try{
//         mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//         app.on("error",()=>{
//             console.log("Error connecting to the database");
//             throw error;
//         })
//         app.listen(process.env.PORT,()=>{
//             console.log(`Server running on port ${process.env.PORT}`);
//         });
//     });