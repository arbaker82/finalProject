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
            alert('Please enter a valid date. Example of valid dates: February 28, March 1.');
        }
    });

    // Function to validate the date
    function isValidDate(month, day) {
        // Check if month and day are valid numbers
        if (!/^[0-1][0-9]$/.test(month) || !/^[0-3][0-9]$/.test(day)) {
            return false;
        }

        // Convert month and day to numbers
        const monthNumber = parseInt(month, 10);
        const dayNumber = parseInt(day, 10);

        // Create a date object with the given month and day
        const date = new Date(2000, monthNumber - 1, dayNumber);

        // Check if the date object’s month and day match the input values
        return date.getMonth() === monthNumber - 1 && date.getDate() === dayNumber;
    }

    // Function to fetch APODs for the specified birthday
    async function fetchAPODsForBirthday(month, day) {
        const startYear = 1995; // The year the first APOD was released
        const endYear = new Date().getFullYear();

        const promises = [];

        // Create a list of promises to fetch APODs for each year from startYear to endYear
        for (let year = startYear; year <= endYear; year++) {
            const date = `${year}-${month}-${day}`;
            promises.push(fetchAPOD(date));
        }

        // Wait for all promises to resolve and filter out null results
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