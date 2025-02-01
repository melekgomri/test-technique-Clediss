import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddTache.css";

const AddTache = () => {
    const [titre, setTitre] = useState("");
    const [description, setDescription] = useState("");
    const [dateDebut, setDateDebut] = useState("");
    const [dateFin, setDateFin] = useState("");
    const [utilisateurId, setUtilisateurId] = useState("");
    const navigate = useNavigate();

    // Fonction de soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/tache/add", {
                titre,
                description,
                dateDebut,
                dateFin,
                utilisateurId
            });
            if (response.status === 201) {
                navigate("/tasks");
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout de la tâche:", error);
        }
    };

    // Fonction de logout
    const handleLogout = () => {
        localStorage.removeItem("token"); // Suppression du token d'authentification
        navigate("/login"); // Redirection vers la page de connexion
    };

    return (
        <div className="container">
            <div className="header">
                <h2>Ajouter une tâche</h2>
                <button className="logout-btn" onClick={handleLogout}>Déconnexion</button>
            </div>
            <form onSubmit={handleSubmit}>
                <label>Titre:</label>
                <input
                    type="text"
                    value={titre}
                    onChange={(e) => setTitre(e.target.value)}
                />

                <label>Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <label>Date de début:</label>
                <input
                    type="date"
                    value={dateDebut}
                    onChange={(e) => setDateDebut(e.target.value)}
                />

                <label>Date de fin:</label>
                <input
                    type="date"
                    value={dateFin}
                    onChange={(e) => setDateFin(e.target.value)}
                />

                <label>ID Utilisateur:</label>
                <input
                    type="text"
                    value={utilisateurId}
                    onChange={(e) => setUtilisateurId(e.target.value)}
                />

                <button type="submit">Ajouter</button>
            </form>
        </div>
    );
};

export default AddTache;
