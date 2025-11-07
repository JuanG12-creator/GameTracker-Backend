const Usuario = require("../models/Usuario.js");
const bcrypt = require("bcryptjs");

// Obtener todos los usuarios
exports.obtenerUsuarios = async (req, res) => {
  try {
    // Solo devolver nombre, avatar y _id
    const usuarios = await Usuario.find().select("nombre avatar _id");
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener los usuarios", error: error.message });
  }
};

// Obtener un usuario por su ID
exports.obtenerUsuarioPorId = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id).select("-contraseña");
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener el usuario", error: error.message });
  }
};

// Actualizar el perfil del usuario autenticado
exports.actualizarUsuario = async (req, res) => {
  try {
    // Validar que el usuario solo pueda editar su propio perfil
    if (req.usuario.id !== req.params.id) {
      return res.status(403).json({ mensaje: "No tienes permiso para editar este perfil" });
    }

    const { nombre, email, contraseña, avatar } = req.body;
    const datosActualizados = { nombre, email, avatar };

    // Si se envía una nueva contraseña, se encripta antes de guardar
    if (contraseña) {
      datosActualizados.contraseña = await bcrypt.hash(contraseña, 10);
    }

    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      req.params.id,
      datosActualizados,
      { new: true }
    ).select("-contraseña");

    res.json({ mensaje: "Perfil actualizado correctamente", usuario: usuarioActualizado });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar el perfil", error: error.message });
  }
};

// Eliminar cuenta de usuario
exports.eliminarUsuario = async (req, res) => {
  try {
    // Solo el propietario de la cuenta puede eliminarla
    if (req.usuario.id !== req.params.id) {
      return res.status(403).json({ mensaje: "No puedes eliminar otra cuenta" });
    }

    await Usuario.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Cuenta eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar el usuario", error: error.message });
  }
};
