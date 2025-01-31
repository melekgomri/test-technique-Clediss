const express=require('express');
require('./config/connect');
const app=express();
const bcrypt = require("bcryptjs");
const tacheRouter = require("./routes/tache");

app.use(express.json());
const cors=require('cors');
app.use(cors());
const utilisateurrouter=require('./routes/utilisateur');  
app.use('/utilisateur',utilisateurrouter); 
app.use("/tache", tacheRouter);

app.post("/chat", (req, res) => {
    const { message } = req.body;

    try {
        // Use the correct syntax
        const command = `${ollamaPath} run llama2 "${message}"`;
        const response = execSync(command, { encoding: "utf-8" });
        res.json({ reply: response.trim() }); // Trim to remove extra whitespace
    } catch (error) {
        console.error("Error executing Ollama:", error.stderr || error.message);
        res.status(500).json({ error: "Erreur avec Ollama" });
    }
});

app.listen(3000,()=>{
    console.log('work server');
})