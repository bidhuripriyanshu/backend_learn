// required("dotenv").config({path:'./env'});
import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/index.js";
const app = express();


dotenv.config({
   path:'./env'
});

connectDB();











/*
(async=>{
    try{
       mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
       app.on("error",()=>{
          console.log("Error connecting to the database");
          throw error;
       })
       app.listen(process.env.PORT,()=>{
          console.log(`Server running on port ${process.env.PORT}');
       });
    } catch(error){
          console.log(error);
          throw error;
    }
})();
*/