const Juego = require("../models/Juego.js");

// Obtener TODOS los juegos
exports.obtenerJuegos = async (req, res) => {
  try {
    const juegos = await Juego.find();
    res.json(juegos);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener juegos" });
  }
};

// Obtener 1 juego
exports.obtenerJuegoPorId = async (req, res) => {
  try {
    const juego = await Juego.findById(req.params.id);
    if (!juego) return res.status(404).json({ mensaje: "Juego no encontrado" });

    res.json(juego);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener juego" });
  }
};

// Crear juego
exports.crearJuego = async (req, res) => {
  try {
    const nuevoJuego = new Juego(req.body);
    await nuevoJuego.save();

    res.status(201).json(nuevoJuego);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear juego" });
  }
};

// Editar juego
exports.actualizarJuego = async (req, res) => {
  try {
    const juego = await Juego.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(juego);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al editar juego" });
  }
};

// Eliminar juego
exports.eliminarJuego = async (req, res) => {
  try {
    await Juego.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Juego eliminado" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar juego" });
  }
};


