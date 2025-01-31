const express = require("express");
const router = express.Router();
const Tache = require("../models/tache");
const Utilisateur = require("../models/utilisateur");

// 📌 Créer une tâche pour un utilisateur
router.post("/add", async (req, res) => {
    const { titre, description, dateDebut, dateFin, utilisateurId } = req.body;

    try {
        const utilisateur = await Utilisateur.findById(utilisateurId);
        if (!utilisateur) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        const tache = new Tache({
            titre,
            description,
            dateDebut,
            dateFin,
            utilisateur: utilisateurId
        });

        await tache.save();
        res.status(201).json(tache);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 📌 Récupérer toutes les tâches d'un utilisateur
router.get("/user/:utilisateurId", async (req, res) => {
    try {
        const taches = await Tache.find({ utilisateur: req.params.utilisateurId }).populate("utilisateur", "name lastname email");
        res.status(200).json(taches);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// 📌 Récupérer toutes les tâches
router.get("/getall", async (req, res) => {
    try {
        const taches = await Tache.find().populate("utilisateur", "name lastname email");
        res.status(200).json(taches);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 📌 Mettre à jour une tâche
router.put("/update/:id", async (req, res) => {
    try {
        const tache = await Tache.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!tache) {
            return res.status(404).json({ message: "Tâche non trouvée" });
        }
        res.status(200).json(tache);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 📌 Supprimer une tâche
router.delete("/delete/:id", async (req, res) => {
    try {
        const tache = await Tache.findByIdAndDelete(req.params.id);
        if (!tache) {
            return res.status(404).json({ message: "Tâche non trouvée" });
        }
        res.status(200).json({ message: "Tâche supprimée avec succès" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
