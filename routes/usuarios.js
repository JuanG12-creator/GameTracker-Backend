const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/usuarios.controller.js");

router.get("/", ctrl.obtenerUsuarios);
router.get("/:id", ctrl.obtenerUsuarioPorId);
router.put("/:id", ctrl.actualizarUsuario);
router.delete("/:id", ctrl.eliminarUsuario);

module.exports = router;

