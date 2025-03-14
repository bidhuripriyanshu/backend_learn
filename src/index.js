// required("dotenv").config({path:'./env'});
import dotenv from "dotenv";
import express from "express";
const app = express(); 
import connectDB from "./db/index.js";
dotenv.config({
   path:'./env'
});

connectDB().then(()=>{
   app.listen(process.env.PORT||8000,()=>{
      console.log(`Server is running at port ${process.env.PORT}`);
   });
}).
catch((err)=>{
   console.log("Error connecting to the database");
   process.exit(1);
});













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