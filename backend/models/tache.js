const mongoose = require("mongoose");

const TacheSchema = new mongoose.Schema({
    titre: { type: String, required: true },
    description: { type: String },
    dateDebut: { type: Date, required: true },
    dateFin: { type: Date, required: true },
    statut: { type: String, enum: ["En attente", "En cours", "Terminée"], default: "En attente" },
    utilisateur: { type: mongoose.Schema.Types.ObjectId, ref: "Utilisateur", required: true } // Relation avec Utilisateur
});

const Tache = mongoose.model("Tache", TacheSchema);
module.exports = Tache;
