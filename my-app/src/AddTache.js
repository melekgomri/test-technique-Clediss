import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './AddTache.css';

const AddTache = () => {
    const [titre, setTitre] = useState("");
    const [description, setDescription] = useState("");
    const [dateDebut, setDateDebut] = useState("");
    const [dateFin, setDateFin] = useState("");
    const [utilisateurId, setUtilisateurId] = useState("");
    const navigate = useNavigate();

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
            console.error("Error adding task:", error);
        }
    };

    return (
        <div>
            <h2>Ajouter une tâche</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Titre:
                    <input
                        type="text"
                        value={titre}
                        onChange={(e) => setTitre(e.target.value)}
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
                <label>
                    Date de début:
                    <input
                        type="date"
                        value={dateDebut}
                        onChange={(e) => setDateDebut(e.target.value)}
                    />
                </label>
                <label>
                    Date de fin:
                    <input
                        type="date"
                        value={dateFin}
                        onChange={(e) => setDateFin(e.target.value)}
                    />
                </label>
                <label>
                    ID Utilisateur:
                    <input
                        type="text"
                        value={utilisateurId}
                        onChange={(e) => setUtilisateurId(e.target.value)}
                    />
                </label>
                <button type="submit">Ajouter</button>
            </form>
        </div>
    );
};

export default AddTache;
