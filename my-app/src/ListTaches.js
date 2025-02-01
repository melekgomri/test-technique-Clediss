import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ListTaches = () => {
    const [taches, setTaches] = useState([]);

    useEffect(() => {
        const fetchTaches = async () => {
            try {
                const response = await axios.get("http://localhost:3000/tache/getall");
                setTaches(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des tâches:", error);
            }
        };
        fetchTaches();
    }, []);

    const handleDelete = async (tacheId) => {
        try {
            await axios.delete(`http://localhost:3000/tache/delete/${tacheId}`);
            setTaches(taches.filter(tache => tache._id !== tacheId));
        } catch (error) {
            console.error("Erreur lors de la suppression de la tâche:", error);
        }
    };

    return (
        <div>
            <h2>Liste des tâches</h2>
            <ul>
                {taches.map((tache) => (
                    <li key={tache._id}>
                        <div>
                            <h3>{tache.titre}</h3>
                            <p>{tache.description}</p>
                            <p>{tache.dateDebut} - {tache.dateFin}</p>
                            <p>{tache.statut}</p>
                            <Link to={`/update/${tache._id}`}>Mettre à jour</Link>
                            <button onClick={() => handleDelete(tache._id)}>Supprimer</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListTaches;
