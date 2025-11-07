const Juego = require("../models/Juego.js");

// 📋 Obtener todos los juegos del usuario autenticado
exports.obtenerJuegos = async (req, res) => {
  try {
    const juegos = await Juego.find({ usuario: req.usuario.id });
    res.json(juegos);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener los juegos", error: error.message });
  }
};

// 🔍 Obtener un juego por ID
exports.obtenerJuegoPorId = async (req, res) => {
  try {
    const juego = await Juego.findById(req.params.id);
    if (!juego) return res.status(404).json({ mensaje: "Juego no encontrado" });

    // Verificar que el juego pertenezca al usuario autenticado
    if (juego.usuario.toString() !== req.usuario.id) {
      return res.status(403).json({ mensaje: "No tienes permiso para ver este juego" });
    }

    res.json(juego);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener el juego", error: error.message });
  }
};

// ✏️ Crear un nuevo juego
exports.crearJuego = async (req, res) => {
  try {
    const { titulo, genero, plataforma, horasJugadas, estado, calificacion, imagen } = req.body;

    const nuevoJuego = new Juego({
      usuario: req.usuario.id,
      titulo,
      genero,
      plataforma,
      horasJugadas,
      estado,
      calificacion,
      imagen
    });

    await nuevoJuego.save();
    res.status(201).json({ mensaje: "Juego agregado correctamente", juego: nuevoJuego });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al agregar el juego", error: error.message });
  }
};

// 🧩 Actualizar juego
exports.actualizarJuego = async (req, res) => {
  try {
    const juego = await Juego.findById(req.params.id);
    if (!juego) return res.status(404).json({ mensaje: "Juego no encontrado" });

    // Validar que solo el propietario pueda editar
    if (juego.usuario.toString() !== req.usuario.id) {
      return res.status(403).json({ mensaje: "No tienes permiso para editar este juego" });
    }

    const camposActualizados = req.body;
    Object.assign(juego, camposActualizados);
    await juego.save();

    res.json({ mensaje: "Juego actualizado correctamente", juego });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar el juego", error: error.message });
  }
};

// 🗑️ Eliminar un juego
exports.eliminarJuego = async (req, res) => {
  try {
    const juego = await Juego.findById(req.params.id);
    if (!juego) return res.status(404).json({ mensaje: "Juego no encontrado" });

    if (juego.usuario.toString() !== req.usuario.id) {
      return res.status(403).json({ mensaje: "No tienes permiso para eliminar este juego" });
    }

    await juego.deleteOne();
    res.json({ mensaje: "Juego eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar el juego", error: error.message });
  }
};
