const mongoose = require("mongoose");

const reseniaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  contenido: { type: String, required: true },
  puntuacion: { type: Number, min: 1, max: 5, required: true },
  juego: { type: mongoose.Schema.Types.ObjectId, ref: "Juego", required: true },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: false } 
}, { timestamps: true });

module.exports = mongoose.model("Resenia", reseniaSchema);

