const express=require('express');
const app=express();
require('dotenv').config();

const port=4000;


app.get('/',(req,res)=>{
    res.send('Hello World');
});

app.get('/about',(req,res)=>{
    res.send('About Us');
});


app.get('/contact',(req,res)=>{
    res.send('Contact Us');
});

app.get('/youtube',(req,res)=>{
    res.send('Youtube');
});


app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${port}`);
});
