const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuarios.controller.js");
const verificarToken = require("../middlewares/verificarToken.js");

// Rutas protegidas
router.get("/", verificarToken, usuariosController.obtenerUsuarios);
router.get("/:id", verificarToken, usuariosController.obtenerUsuarioPorId);
router.put("/:id", verificarToken, usuariosController.actualizarUsuario);
router.delete("/:id", verificarToken, usuariosController.eliminarUsuario);

module.exports = router;
