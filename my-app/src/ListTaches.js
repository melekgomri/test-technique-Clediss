import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const ListTaches = () => {
    const [taches, setTaches] = useState([]);
    const navigate = useNavigate();

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

    const handleLogout = () => {
        // Suppression du token ou nettoyage du localStorage
        localStorage.removeItem("token"); 
        navigate("/login"); // Redirection vers la page de connexion
    };

    return (
        <div>
            {/* ✅ Header avec bouton Logout bien positionné */}
            <header style={styles.header}>
                <h1>Gestion des Tâches</h1>
                <button onClick={handleLogout} style={styles.logoutButton}>Déconnexion</button>
            </header>

            <div style={styles.container}>
                <h2>Liste des tâches</h2>
                <ul>
                    {taches.map((tache) => (
                        <li key={tache._id} style={styles.taskItem}>
                            <div>
                                <h3>{tache.titre}</h3>
                                <p>{tache.description}</p>
                                <p>{tache.dateDebut} - {tache.dateFin}</p>
                                <p>{tache.statut}</p>
                                <Link to={`/update/${tache._id}`} style={styles.link}>Mettre à jour</Link>
                                <button onClick={() => handleDelete(tache._id)} style={styles.deleteButton}>Supprimer</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const styles = {
    header: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        backgroundColor: "#333",
        color: "#fff",
        padding: "15px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    logoutButton: {
        backgroundColor: "#ff4d4d",
        color: "white",
        border: "none",
        padding: "10px 15px",
        cursor: "pointer",
        borderRadius: "5px",
    },
    container: {
        marginTop: "70px",
        padding: "20px",
    },
    taskItem: {
        border: "1px solid #ddd",
        padding: "10px",
        marginBottom: "10px",
        borderRadius: "5px",
    },
    deleteButton: {
        backgroundColor: "#ff4d4d",
        color: "white",
        border: "none",
        padding: "5px 10px",
        cursor: "pointer",
        borderRadius: "5px",
        marginLeft: "10px",
    },
    link: {
        textDecoration: "none",
        color: "#007bff",
        marginRight: "10px",
    },
};

export default ListTaches;
