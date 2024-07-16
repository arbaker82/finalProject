/**
 * This script fetches and displays Astronomy Picture of the Day (APOD) data from the NASA API.
 * It allows users to search for APOD data by date and validates the entered date.
 * The fetched APOD data is displayed in the corresponding HTML elements.
 *
 * @see {@link https://api.nasa.gov/planetary/apod|NASA APOD API}
 */

document.addEventListener('DOMContentLoaded', () => {
    // NASA API key
    const apiKey = 'oedgW1nDvvL0CMEsXv6wpIZ3D2ECcMPRlOF357sZ';

    // DOM elements for displaying APOD
    const apodImg = document.getElementById('apod-img');
    const apodVideo = document.getElementById('apod-video');
    const apodTitle = document.getElementById('apod-title');
    const apodDate = document.getElementById('apod-date');
    const apodDesc = document.getElementById('apod-desc');

    // DOM elements for date search
    const searchDate = document.getElementById('search-date');
    const searchBtn = document.getElementById('search-btn');

    // Event listener for the search button
    searchBtn.addEventListener('click', () => {
        const date = searchDate.value;
        if (isValidDate(date)) {
            fetchAPOD(date);
        } else {
            alert('Please enter a valid date between today and June 16, 1995, the day the first APOD was released.');
        }
    });

    /**
     * Checks if the entered date is in the correct format (YYYY-MM-DD) and within the valid range (June 16, 1995, to today).
     *
     * @param {string} dateString - The date string to validate.
     * @returns {boolean} - True if the date is valid, false otherwise.
     */
    function isValidDate(dateString) {
        // Check if the date is in the format YYYY-MM-DD
        const datePattern = /^\d{4}-\d{2}-\d{2}$/;
        if (!datePattern.test(dateString)) return false;

        // Ensure the date is between June 16, 1995, and today
        const date = new Date(dateString);
        const earliestDate = new Date('1995-06-16');
        const today = new Date();

        return date >= earliestDate && date <= today;
    }

    /**
     * Fetches APOD data from the NASA API for the specified date (or today's date if no date is provided).
     * Displays the fetched APOD data in the corresponding HTML elements.
     *
     * @param {string} [date=''] - The date for which to fetch APOD data in the format YYYY-MM-DD.
     * @returns {Promise<void>} - A promise that resolves when the APOD data is fetched and displayed.
     */
    async function fetchAPOD(date = '') {
        const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}${date ? `&date=${date}` : ''}`;
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Error fetching APOD for ${date}`);

            const data = await response.json();
            displayAPOD(data);
        } catch (error) {
            console.error('Error fetching APOD:', error);
        }
    }

    /**
     * Displays the fetched APOD data in the corresponding HTML elements.
     * Handles both images and videos, displaying the appropriate media type.
     *
     * @param {object} data - The APOD data fetched from the NASA API.
     */
    function displayAPOD(data) {
        apodTitle.textContent = data.title;
        apodDate.textContent = data.date;
        apodDesc.textContent = data.explanation;

        // Display image or video based on the media type
        if (data.media_type === 'image') {
            apodImg.src = data.url;
            apodImg.style.display = 'block';
            apodVideo.style.display = 'none';
        } else if (data.media_type === 'video') {
            apodVideo.src = data.url;
            apodVideo.style.display = 'block';
            apodImg.style.display = 'none';
        }
    }

    // Fetch today's APOD on page load
    fetchAPOD();
});
