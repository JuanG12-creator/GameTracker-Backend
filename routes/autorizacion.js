const express = require("express");
const router = express.Router();
const autorizacionController = require("../controllers/autorizacion.controller.js");

router.post("/registro", autorizacionController.registro);
router.post("/login", autorizacionController.login);

module.exports = router;