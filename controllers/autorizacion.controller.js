const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario.js");

// Registro de usuario
exports.registro = async (req, res) => {
  try {
    const { nombre, email, contraseña, avatar } = req.body;

    // Verificar si el correo ya está registrado
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: "El correo ya está registrado" });
    }

    // Crear nuevo usuario (sin encriptar contraseña)
    const nuevoUsuario = new Usuario({
      nombre,
      email,
      contraseña, // Guardar la contraseña tal cual
      avatar: avatar || "https://i.imgur.com/8Km9tLL.png",
    });

    await nuevoUsuario.save();

    res.status(201).json({
      mensaje: "Usuario registrado correctamente",
      usuario: {
        _id: nuevoUsuario._id,
        nombre: nuevoUsuario.nombre,
        email: nuevoUsuario.email,
        avatar: nuevoUsuario.avatar,
      },
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al registrar usuario", error: error.message });
  }
};

// Inicio de sesión
exports.login = async (req, res) => {
  try {
    const { email, contraseña } = req.body;

    // Buscar usuario por email
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    // Comparar contraseñas directamente (sin bcrypt)
    if (contraseña !== usuario.contraseña) {
      return res.status(401).json({ mensaje: "Contraseña incorrecta" });
    }

    // Crear token JWT
    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: "2h" });

    res.json({
      mensaje: "Inicio de sesión exitoso",
      token,
      usuario: {
        _id: usuario._id,
        nombre: usuario.nombre,
        avatar: usuario.avatar,
      },
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al iniciar sesión", error: error.message });
  }
};
