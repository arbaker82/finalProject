const express = require('express');
const app = express();
const port = 3000;

// Middleware to serve static files
app.use(express.static('public'));

// Endpoint to fetch APOD data
app.get('/apod', async (req, res) => {
    const fetch = (await import('node-fetch')).default;
    const apiKey = 'oedgW1nDvvL0CMEsXv6wpIZ3D2ECcMPRlOF357sZ';
    const date = req.query.date;
    const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching APOD:', error);
        res.status(500).send('Error fetching APOD');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});