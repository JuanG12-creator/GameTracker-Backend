const Resenia = require("../models/Resenia.js");

// Obtener todas las reseñas
exports.obtenerResenias = async (req, res) => {
  try {
    const resenias = await Resenia.find()
      .populate("usuario", "nombre avatar")
      .populate("juego", "titulo plataforma");
    res.json(resenias);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener las reseñas", error: error.message });
  }
};

//  Obtener reseña por ID
exports.obtenerReseniaPorId = async (req, res) => {
  try {
    const resenia = await Resenia.findById(req.params.id)
      .populate("usuario", "nombre avatar")
      .populate("juego", "titulo plataforma");
    if (!resenia) return res.status(404).json({ mensaje: "Reseña no encontrada" });
    res.json(resenia);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener la reseña", error: error.message });
  }
};

//  Crear una nueva reseña
exports.crearResenia = async (req, res) => {
  try {
    const { juego, texto, puntuacion } = req.body;

    const nuevaResenia = new Resenia({
      usuario: req.usuario.id, // viene del middleware de autenticación
      juego,
      texto,
      puntuacion,
    });

    await nuevaResenia.save();
    res.status(201).json({ mensaje: "Reseña creada correctamente", reseña: nuevaResenia });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear la reseña", error: error.message });
  }
};

// Actualizar reseña
exports.actualizarResenia = async (req, res) => {
  try {
    const resenia = await Resenia.findById(req.params.id);
    if (!resenia) return res.status(404).json({ mensaje: "Reseña no encontrada" });

    // Validar que solo el autor pueda modificar su reseña
    if (resenia.usuario.toString() !== req.usuario.id) {
      return res.status(403).json({ mensaje: "No tienes permiso para editar esta reseña" });
    }

    const { texto, puntuacion } = req.body;
    resenia.texto = texto || resenia.texto;
    resenia.puntuacion = puntuacion || resenia.puntuacion;
    await resenia.save();

    res.json({ mensaje: "Reseña actualizada correctamente", resenia });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar la reseña", error: error.message });
  }
};

// Eliminar reseña
exports.eliminarResenia = async (req, res) => {
  try {
    const resenia = await Resenia.findById(req.params.id);
    if (!resenia) return res.status(404).json({ mensaje: "Reseña no encontrada" });

    // Validar que solo el autor pueda eliminarla
    if (resenia.usuario.toString() !== req.usuario.id) {
      return res.status(403).json({ mensaje: "No tienes permiso para eliminar esta reseña" });
    }

    await resenia.deleteOne();
    res.json({ mensaje: "Reseña eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar la reseña", error: error.message });
  }
};
