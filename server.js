import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

// Regular expressions for validating date, month, and day
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const monthRegex = /^(0[1-9]|1[0-2])$/;
const dayRegex = /^(0[1-9]|[12][0-9]|3[01])$/;

// Define the valid date range for the NASA APOD API
const startDate = new Date('1995-06-16');
const endDate = new Date();  // Today's date

// Function to check if a date is within the valid range
const isValidDate = (date) => {
    const d = new Date(date);
    return d >= startDate && d <= endDate;
};

// Endpoint to fetch APOD for a specific date
app.get('/apod', async (req, res) => {
    const date = req.query.date;

    if (!dateRegex.test(date)) {
        return res.status(400).json({ error: 'Invalid date format. Please use YYYY-MM-DD.' });
    }

    if (!isValidDate(date)) {
        return res.status(400).json({ error: 'Date must be between Jun 16, 1995 and today.' });
    }

    const apiKey = process.env.NASA_API_KEY;
    const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Error fetching APOD for date: ${date} - ${errorText}`);
            throw new Error(`Network response was not ok: ${errorText}`);
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Fetch error:', error);
        res.status(500).json({ error: 'Failed to fetch APOD' });
    }
});

// Endpoint to fetch APODs for a specific birthday across multiple years
app.get('/birthday-apods', async (req, res) => {
    const month = req.query.month;
    const day = req.query.day;

    if (!monthRegex.test(month)) {
        return res.status(400).json({ error: 'Invalid month. Please use MM format.' });
    }
    if (!dayRegex.test(day)) {
        return res.status(400).json({ error: 'Invalid day. Please use DD format.' });
    }

    const apiKey = process.env.NASA_API_KEY;
    const years = Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i);

    try {
        const apodData = await Promise.all(years.map(async (year) => {
            const date = `${year}-${month}-${day}`;
            if (!isValidDate(date)) {
                console.log(`Skipping invalid date: ${date}`);
                return null;  // Skip invalid dates
            }
            const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;
            console.log(`Fetching APOD for date: ${date}`);
            const response = await fetch(url);
            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Error fetching APOD for date: ${date} - ${errorText}`);
                throw new Error(`Network response was not ok: ${errorText}`);
            }
            return await response.json();
        }));
        res.json(apodData.filter(data => data !== null));  // Filter out null entries
    } catch (error) {
        console.error('Fetch error:', error);
        res.status(500).json({ error: 'Failed to fetch birthday APODs' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});