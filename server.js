const express = require("express");
const dotenv = require("dotenv");
const connectDB = require ("./config/db");

dotenv.config();

const app = express();

app.use(express.json());

connectDB();


//Inicio 
app.listen(process.env.PORT, ()=>{
    console.log(`El servidor esta corriendo en http://localhost:${process.env.PORT}`);
    console.log();
})