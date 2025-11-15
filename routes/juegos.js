const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/juegos.controller.js");

router.get("/", ctrl.obtenerJuegos);
router.get("/:id", ctrl.obtenerJuegoPorId);
router.post("/", ctrl.crearJuego);
router.put("/:id", ctrl.actualizarJuego);
router.delete("/:id", ctrl.eliminarJuego);

module.exports = router;

