const Resenia = require("../models/Resenia.js");

// Obtener todas las reseñas
exports.obtenerResenias = async (req, res) => {
  try {
    const resenias = await Resenia.find();
    res.json(resenias);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener reseñas" });
  }
};

// Obtener una reseña
exports.obtenerReseniaPorId = async (req, res) => {
  try {
    const resenia = await Resenia.findById(req.params.id);
    if (!resenia) return res.status(404).json({ mensaje: "No encontrada" });

    res.json(resenia);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener reseña" });
  }
};

// Crear reseña
exports.crearResenia = async (req, res) => {
  try {
    const nueva = new Resenia(req.body);
    await nueva.save();

    res.status(201).json(nueva);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear reseña" });
  }
};

// Editar reseña
exports.actualizarResenia = async (req, res) => {
  try {
    const resenia = await Resenia.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(resenia);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al editar reseña" });
  }
};

// Eliminar reseña
exports.eliminarResenia = async (req, res) => {
  try {
    await Resenia.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Reseña eliminada" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar reseña" });
  }
};
