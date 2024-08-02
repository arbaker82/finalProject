import express from 'express'; // Import Express.js framework
import fetch from 'node-fetch'; // Import node-fetch to make API requests
import dotenv from 'dotenv'; // Import dotenv to manage environment variables

dotenv.config(); // Load environment variables from a .env file

const app = express(); // Initialize an Express application
const PORT = process.env.PORT || 3000; // Set the port for the server

app.use(express.static('public')); // Serve static files from the 'public' directory

// Regular expressions for validating date, month, and day (REQUIREMENT 3)
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const monthRegex = /^(0[1-9]|1[0-2])$/;
const dayRegex = /^(0[1-9]|[12][0-9]|3[01])$/;

// Define the valid date range for the NASA APOD API
const startDate = new Date('1995-06-16');
const endDate = new Date();  // Today's date

// Function to check if a date is within the valid range (REQUIREMENT 4)
const isValidDate = (date) => {
    const d = new Date(date);
    return d >= startDate && d <= endDate;
};

// Endpoint to fetch APOD for a specific date (REQUIREMENT 6)
app.get('/apod', async (req, res) => {
    const date = req.query.date;

    if (!dateRegex.test(date)) {
        return res.status(400).json({ error: 'Invalid date format. Please use YYYY-MM-DD.' });
    }

    if (!isValidDate(date)) {
        return res.status(400).json({ error: 'Date must be between Jun 16, 1995 and today.' });
    }

    const apiKey = process.env.NASA_API_KEY;
    const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`; // URL to fetch APOD (REQUIREMENT 5)

    try {
        const response = await fetch(url);
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Network response was not ok: ${errorText}`);
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch APOD' });
    }
});

// Endpoint to fetch APODs for a specific birthday across multiple years (REQUIREMENT 6)
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
    const years = Array.from({ length: 35 }, (_, i) => new Date().getFullYear() - i); // Create an array of the last 35 years (REQUIREMENT 1)

    try {
        const apodData = await Promise.all(years.map(async (year) => {
            const date = `${year}-${month}-${day}`;
            if (!isValidDate(date)) {
                return null;  // Skip invalid dates
            }
            const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`; // URL to fetch APOD (REQUIREMENT 5)
            const response = await fetch(url);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Network response was not ok: ${errorText}`);
            }
            return await response.json();
        }));
        res.json(apodData.filter(data => data !== null));  // Filter out null entries
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch birthday APODs' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

/* 	CODE SUMMARY:

    1.	Imports and Configuration:
	    •	Imports necessary modules: express for creating the server, node-fetch for making API requests, and dotenv for managing environment variables.
	    •	Configures environment variables using dotenv.
	2.	Server Initialization:
	    •	Initializes an Express application.
	    •	Sets the port for the server to the value specified in the environment variables or defaults to 3000.
	    •	Serves static files from the ‘public’ directory.
	3.	Validation Setup:
	    •	Defines regular expressions for validating date, month, and day inputs.
	    •	Defines the valid date range for the NASA APOD API (from June 16, 1995, to today).
	4.	Helper Functions:
	    •	Creates a function to check if a given date is within the valid date range.
	5.	Endpoints:
	    •	/apod: Fetches the APOD for a specific date.
	    •	Validates the date format and range.
	    •	Constructs the API request URL using the provided date and NASA API key.
	    •	Fetches the APOD data from the NASA API and returns it as JSON.
	    •	/birthday-apods: Fetches APODs for a specific month and day across the last 35 years.
	    •	Validates the month and day inputs.
	    •	Constructs an array of the last 35 years.
	    •	Fetches the APOD data for each valid date and returns the data as JSON, filtering out invalid dates.
	6.	Server Listening:
	    •	Starts the server and listens on the specified port, logging a message to the console when the server is running. */