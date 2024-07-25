import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env

const app = express();
const port = 3000;
const apiKey = process.env.NASA_API_KEY; // Use environment variable for API key

app.use(express.static('public'));

app.get('/apod', async (req, res) => {
    const { date } = req.query;
    const url = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from NASA API' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});