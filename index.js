const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware to parse JSON bodies from Android
app.use(express.json());

// Simple test route
app.get("/", (req, res) => {
    res.send("Madlibs server is running!");
});

// GET /madlib-test – static HTML page just for testing via browser/Android GET
app.get("/madlib-test", (req, res) => {
    const html = `
    <!DOCTYPE html>
    <html>
    <head><title>Madlib Test</title></head>
    <body>
        <h1>Welcome to My Madlib Server</h1>
        <p>If you see this, your GET request worked.</p>
    </body>
    </html>`;
    res.send(html);
});

// POST /madlib – expects JSON, returns JSON story
app.post("/madlib", (req, res) => {
    // Expecting something like:
    // { "place": "park", "adjective": "silly", "animal": "dog", "verb": "dance", "noun": "bench" }
    const { place, adjective, animal, verb, noun } = req.body;

    if (!place || !adjective || !animal || !verb || !noun) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const story = `Today I went to the ${place} and saw a ${adjective} ${animal}. ` +
        `It started to ${verb} on top of a ${noun}. It was amazing!`;

    res.json({ story: story });
});

app.listen(PORT, () => {
    console.log(`Madlibs server listening on port ${PORT}`);
});

