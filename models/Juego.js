const mongoose = require("mongoose");

const juegoSchema = new mongoose.Schema(
  {
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
    titulo: { type: String, required: true },
    genero: { type: String, required: true },
    plataforma: { type: String, required: true },
    horasJugadas: { type: Number, default: 0 },
    estado: {
      type: String,
      enum: ["Jugando", "Completado", "Pendiente"],
      default: "Pendiente"
    },
    calificacion: { type: Number, min: 1, max: 10 },
    fechaAgregado: { type: Date, default: Date.now },
    imagen: {
      type: String,
      default: "https://i.imgur.com/Rw8dU4F.png"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Juego", juegoSchema);
