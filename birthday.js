document.addEventListener('DOMContentLoaded', () => {
    // NASA API key
    const apiKey = 'oedgW1nDvvL0CMEsXv6wpIZ3D2ECcMPRlOF357sZ';

    // DOM elements for the birthday search
    const searchBtn = document.getElementById('search-btn');
    const monthInput = document.getElementById('month');
    const dayInput = document.getElementById('day');
    const carousel = document.getElementById('carousel');

    // Event listener for the search button
    searchBtn.addEventListener('click', () => {
        const month = monthInput.value;
        const day = dayInput.value;
        if (isValidDate(month, day)) {
            fetchAPODsForBirthday(month, day);
        } else {
            alert('Please enter a valid date.');
        }
    });

    // Function to validate the date
    function isValidDate(month, day) {
        // Check if the month and day are valid
        return /^[01]\d$/.test(month) && /^[0-3]\d$/.test(day) && day <= 31;
    }

    // Function to fetch APODs for the specified birthday
    async function fetchAPODsForBirthday(month, day) {
        const startYear = 1995; // The year the first APOD was released
        const endYear = new Date().getFullYear();

//** REQUIREMENT 1: Create a list of promises to fetch APODs for each year from startYear to endYear. **//    
        
    const promises = [];

        // Create a list of promises to fetch APODs for each year from startYear to endYear
        for (let year = startYear; year <= endYear; year++) {
            const date = `${year}-${month}-${day}`;
            promises.push(fetchAPOD(date));
        }

        // Wait for all promises to resolve and filter out null results
//** REQUIREMENT 1: Creat an array to store APOD data  **//    
        const apods = await Promise.all(promises);
        displayCarousel(apods.filter(apod => apod));
    }

    // Function to fetch APOD data for a specific date from NASA API
    async function fetchAPOD(date) {
        const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error fetching APOD for ${date}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching APOD:', error);
            return null;
        }
    }

    // Function to display the fetched APOD data in a carousel

//** Requirement 2: Array analysis: analyze APODs array to determine wether each item is an imf or video and dynamically create HTML elements **//    
    
    function displayCarousel(apods) {
        carousel.innerHTML = '';  // Clear previous images
        apods.forEach(apod => {
            if (apod) {
                // Create an image or video element based on the media type
                const mediaElement = document.createElement(apod.media_type === 'image' ? 'img' : 'iframe');
                mediaElement.src = apod.url;
                mediaElement.alt = apod.title;
                if (apod.media_type === 'video') {
                    mediaElement.width = "560";
                    mediaElement.height = "315";
                    mediaElement.frameBorder = "0";
                    mediaElement.allowFullscreen = true;
                }
                carousel.appendChild(mediaElement);
            }
        });
    }
});


/**
 * This JavaScript file handles fetching and displaying
 * APODs for a specific birthday across multiple years.
 *
 * @event DOMContentLoaded - The DOMContentLoaded event ensures
 * the code runs only after the DOM is fully loaded.
 * @constant {string} apiKey - The API key required to fetch data from the NASA APOD API.
 * @constant {HTMLElement} searchBtn - The search button element.
 * @constant {HTMLElement} monthInput - The input field for the month.
 * @constant {HTMLElement} dayInput - The input field for the day.
 * @constant {HTMLElement} carousel - The carousel element.
 *
 * @function isValidDate - Function to validate the date.
 * @param {string} month - The month value.
 * @param {string} day - The day value.
 * @returns {boolean} - Returns true if the date is valid, false otherwise.
 *
 * @function fetchAPODsForBirthday - Function to fetch APODs for the specified birthday.
 * @param {string} month - The month value.
 * @param {string} day - The day value.
 * @returns {Promise<void>} - Returns a promise that resolves when all APODs are fetched.
 *
 * @function fetchAPOD - Function to fetch APOD data for a specific date from NASA API.
 * @param {string} date - The date in the format 'YYYY-MM-DD'.
 * @returns {Promise<object|null>} - Returns a promise that resolves with the APOD data or null if there is an error.
 *
 * @function displayCarousel - Function to display the fetched APOD data in a carousel.
 * @param {object[]} apods - An array of APOD objects.
 * @returns {void}
 */