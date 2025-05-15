const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
    console.log(`Requête: ${req.method} ${req.url} à ${new Date().toISOString()}`);
    const start = Date.now();
    res.on("finish", () => {
        console.log(`Réponse pour ${req.method} ${req.url} en ${Date.now() - start} ms`);
    });
    next();
});

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

app.get("/api/status", (req, res) => {
    res.json({ status: "running", time: new Date() });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
