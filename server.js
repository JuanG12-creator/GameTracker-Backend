const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const usuariosRoutes = require("./routes/usuarios.js");
const reseniasRoutes = require("./routes/resenias.js");
const juegosRoutes = require("./routes/juegos.js");
const connectDB = require("./config/db.js");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

connectDB();

// Rutas
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/resenias", reseniasRoutes);
app.use("/api/juegos", juegosRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${process.env.PORT}`);
});

