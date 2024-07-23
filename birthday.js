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
            fetchAPODsForBirthday(month, day); // REQ 6. Retrieve data from a third-party API and use it to display something in the app.
        } else {
            alert('Please enter a valid date. Example of valid dates: February 28, March 1.'); // REQ 3. Inform the user about invalid input.
        }
    });

    // REQ 3. Function to validate the date using a regular expression
    function isValidDate(month, day) {
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

    // REQ 1. Function to fetch APODs for the specified birthday
    async function fetchAPODsForBirthday(month, day) {
        const startYear = 1995; // The year the first APOD was released
        const endYear = new Date().getFullYear();

        const promises = [];

        // Use arrays to store and retrieve information that is displayed in the app.
        for (let year = startYear; year <= endYear; year++) {
            const date = `${year}-${month}-${day}`;
            promises.push(fetchAPOD(date)); // REQ 6. Retrieve data from a third-party API and use it to display something in the app.
        }

        // Wait for all promises to resolve and filter out null results
        const apods = await Promise.all(promises);
        displayCarousel(apods.filter(apod => apod)); // REQ 2. Analyze data stored in arrays and display information about it.
    }

    // Function to fetch APOD data for a specific date from NASA API
    async function fetchAPOD(date) {
        const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error fetching APOD for ${date}`);
            }
            return await response.json(); // Retrieve data from a third-party API.
        } catch (error) {
            console.error('Error fetching APOD:', error);
            return null;
        }
    }

    // REQ 2. Function to display the fetched APOD data in a carousel
    function displayCarousel(apods) {
        carousel.innerHTML = '';  // Clear previous images

        apods.forEach(apod => {
            if (apod) {
                // Create a container for the media element and link
                const mediaContainer = document.createElement('a');
                mediaContainer.href = apod.hdurl || apod.url; // Use high-resolution URL if available
                mediaContainer.target = '_blank'; // Open in a new tab

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

                mediaContainer.appendChild(mediaElement);
                carousel.appendChild(mediaContainer);
            }
        });
    }
});