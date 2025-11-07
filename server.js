const express = require("express");
const dotenv = require("dotenv");
const connectDB = require ("./config/db");
const usuariosRoutes = require ("./routes/usuarios.js");
const juegosRoutes = require ("./routes/juegos.js");

dotenv.config();

const app = express();

app.use(express.json());

connectDB();
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/juegos", juegosRoutes);

//Inicio 
app.listen(process.env.PORT, ()=>{
    console.log(`El servidor esta corriendo en http://localhost:${process.env.PORT}`);
    console.log();
})