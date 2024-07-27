import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

// Regular expression for validating date in YYYY-MM-DD format
const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // REQ 3
// Regular expressions for validating month and day
const monthRegex = /^(0[1-9]|1[0-2])$/; // REQ 3
const dayRegex = /^(0[1-9]|[12][0-9]|3[01])$/; // REQ 3

// Endpoint to fetch APOD for a specific date
app.get('/apod', async (req, res) => {
    const date = req.query.date;

    // REQ 3: Validate date parameter using regex
    if (!dateRegex.test(date)) {
        return res.status(400).json({ error: 'Invalid date format. Please use YYYY-MM-DD.' });
    }

    const apiKey = process.env.NASA_API_KEY;
    const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        res.json(data); // REQ 6
    } catch (error) {
        console.error('Fetch error:', error);
        res.status(500).json({ error: 'Failed to fetch APOD' });
    }
});

// Endpoint to fetch APODs for a specific birthday across multiple years
app.get('/birthday-apods', async (req, res) => {
    const month = req.query.month;
    const day = req.query.day;

    // REQ 3: Validate month and day parameters using regex
    if (!monthRegex.test(month)) {
        return res.status(400).json({ error: 'Invalid month. Please use MM format.' });
    }
    if (!dayRegex.test(day)) {
        return res.status(400).json({ error: 'Invalid day. Please use DD format.' });
    }

    const apiKey = process.env.NASA_API_KEY;
    const years = Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i); // Requirement 2 & 1

    try {
        const apodData = await Promise.all(years.map(async (year) => {
            const date = `${year}-${month}-${day}`;
            const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json(); // REQ 6
        }));
        res.json(apodData); // REQ 6
    } catch (error) {
        console.error('Fetch error:', error);
        res.status(500).json({ error: 'Failed to fetch birthday APODs' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); // REQ 7
});