const express = require("express");
const router = express.Router();
const {
  obtenerJuegos,
  obtenerJuegoPorId,
  crearJuego,
  actualizarJuego,
  eliminarJuego,
} = require("../controllers/juegos.controller.js");

const verificarToken = require("../middlewares/verificarToken.js");

// Todas las rutas requieren estar autenticado
router.get("/", verificarToken, obtenerJuegos);
router.get("/:id", verificarToken, obtenerJuegoPorId);
router.post("/", verificarToken, crearJuego);
router.put("/:id", verificarToken, actualizarJuego);
router.delete("/:id", verificarToken, eliminarJuego);

module.exports = router;
