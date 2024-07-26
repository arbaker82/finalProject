import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/apod', async (req, res) => {
    const date = req.query.date;
    const apiKey = process.env.NASA_API_KEY;
    const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Fetch error:', error);
        res.status(500).json({ error: 'Failed to fetch APOD' });
    }
});

app.get('/birthday-apods', async (req, res) => {
    const month = req.query.month;
    const day = req.query.day;
    const apiKey = process.env.NASA_API_KEY;
    const years = Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i);

    try {
        const apodData = await Promise.all(years.map(async (year) => {
            const date = `${year}-${month}-${day}`;
            const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        }));
        res.json(apodData);
    } catch (error) {
        console.error('Fetch error:', error);
        res.status(500).json({ error: 'Failed to fetch birthday APODs' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});