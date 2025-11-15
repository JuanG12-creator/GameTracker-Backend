const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/resenias.controller.js");

router.get("/", ctrl.obtenerResenias);
router.get("/:id", ctrl.obtenerReseniaPorId);
router.post("/", ctrl.crearResenia);
router.put("/:id", ctrl.actualizarResenia);
router.delete("/:id", ctrl.eliminarResenia);

module.exports = router;

