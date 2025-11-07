const mongoose = require("mongoose");

const reseniaSchema = new mongoose.Schema(
  {
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
    juego: { type: mongoose.Schema.Types.ObjectId, ref: "Juego", required: true },
    texto: { type: String, required: true },
    puntuacion: { type: Number, min: 1, max: 5, required: true },
    fecha: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resenia", reseniaSchema);
