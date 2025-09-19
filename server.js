const express = require("express");
const cors = require("cors");

// Import do fetch do node-fetch
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();
app.use(cors());
app.use(express.json());

// Use variável de ambiente para a chave (mais seguro) ou coloque direto aqui para teste rápido
const OPENAI_API_KEY = "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";

app.post("/chat", async (req, res) => {
    const { prompt } = req.body;
    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [{ role: "user", content: prompt }]
            })
        });

        const data = await response.json();
        const reply = data.choices?.[0]?.message?.content || "⚠️ Erro na resposta";
        res.json({ reply });
    } catch (err) {
        res.json({ reply: "❌ Erro: " + err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
