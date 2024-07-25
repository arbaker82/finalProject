document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'oedgW1nDvvL0CMEsXv6wpIZ3D2ECcMPRlOF357sZ'; // This key will be ignored, but it's required for validation.

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

    // Function to validate the date using a regular expression
    function isValidDate(month, day) {
        if (!/^[0-1][0-9]$/.test(month) || !/^[0-3][0-9]$/.test(day)) {
            return false;
        }

        const monthNumber = parseInt(month, 10);
        const dayNumber = parseInt(day, 10);

        const date = new Date(2000, monthNumber - 1, dayNumber);

        return date.getMonth() === monthNumber - 1 && date.getDate() === dayNumber;
    }

    // Function to fetch APODs for the specified birthday
    async function fetchAPODsForBirthday(month, day) {
        const startYear = 1995;
        const endYear = new Date().getFullYear();

        const promises = [];

        for (let year = startYear; year <= endYear; year++) {
            const date = `${year}-${month}-${day}`;
            promises.push(fetchAPOD(date));
        }

        const apods = await Promise.all(promises);
        displayCarousel(apods.filter(apod => apod));
    }

    // Function to fetch APOD data for a specific date from NASA API
    async function fetchAPOD(date) {
        const url = `/apod?date=${date}`;
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
        carousel.innerHTML = '';

        apods.forEach(apod => {
            if (apod) {
                const mediaContainer = document.createElement('a');
                mediaContainer.href = apod.hdurl || apod.url;
                mediaContainer.target = '_blank';

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