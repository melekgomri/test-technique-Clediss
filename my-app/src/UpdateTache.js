import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UpdateTache = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tache, setTache] = useState({
        titre: "",
        description: "",
        dateDebut: "",
        dateFin: "",
        statut: "En attente",
        utilisateurId: ""
    });

    useEffect(() => {
        const fetchTache = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/tache/${id}`);
                setTache(response.data);
            } catch (error) {
                console.error("Error fetching task:", error);
            }
        };
        fetchTache();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3000/taches/update/${id}`, tache);
            if (response.status === 200) {
                navigate("/tasks");
            }
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const handleChange = (e) => {
        setTache({
            ...tache,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div>
            <h2>Mettre à jour la tâche</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Titre:
                    <input
                        type="text"
                        name="titre"
                        value={tache.titre}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        name="description"
                        value={tache.description}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Date de début:
                    <input
                        type="date"
                        name="dateDebut"
                        value={tache.dateDebut}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Date de fin:
                    <input
                        type="date"
                        name="dateFin"
                        value={tache.dateFin}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Statut:
                    <select
                        name="statut"
                        value={tache.statut}
                        onChange={handleChange}
                    >
                        <option value="En attente">En attente</option>
                        <option value="En cours">En cours</option>
                        <option value="Terminée">Terminée</option>
                    </select>
                </label>
                <button type="submit">Mettre à jour</button>
            </form>
        </div>
    );
};

export default UpdateTache;
