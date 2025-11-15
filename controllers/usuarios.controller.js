const Usuario = require("../models/Usuario.js");

// Obtener todos los usuarios
exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find().select("-contraseña");
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener los usuarios" });
  }
};

// Obtener usuario por ID
exports.obtenerUsuarioPorId = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id).select("-contraseña");
    if (!usuario) return res.status(404).json({ mensaje: "Usuario no encontrado" });

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener usuario" });
  }
};

// Actualizar usuario
exports.actualizarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select("-contraseña");

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: "Error actualizando usuario" });
  }
};

// Eliminar usuario
exports.eliminarUsuario = async (req, res) => {
  try {
    await Usuario.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar usuario" });
  }
};

