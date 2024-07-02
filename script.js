document.addEventListener('DOMContentLoaded', () => {
    const apodImg = document.getElementById('apod-img');
    const apodTitle = document.getElementById('apod-title');
    const apodDate = document.getElementById('apod-date');
    const apodDesc = document.getElementById('apod-desc');
    const searchDate = document.getElementById('search-date');
    const searchBtn = document.getElementById('search-btn');

    const apiKey = 'oedgW1nDvvL0CMEsXv6wpIZ3D2ECcMPRlOF357sZ';

    // Fetch the APOD for today
    fetchAPOD();

    // Fetch APOD for a specific date when the search button is clicked
    searchBtn.addEventListener('click', () => {
        const date = searchDate.value;
        if (isValidDate(date)) {
            fetchAPOD(date);
        } else {
            alert('Please enter a valid date in YYYY-MM-DD format within the range from 1995-06-16 to today.');
        }
    });

    /**
     * Fetch the Astronomy Picture of the Day (APOD) from NASA's API.
     * @param {string} date - The date for which to fetch the APOD (optional).
     */
    function fetchAPOD(date = '') {
        let url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
        if (date) {
            url += `&date=${date}`;
        }

        fetch(url)
            .then(response => response.json())
            .then(data => {
                apodImg.src = data.url;
                apodTitle.textContent = data.title;
                apodDate.textContent = data.date;
                apodDesc.textContent = data.explanation;
            })
            .catch(error => {
                console.error('Error fetching APOD:', error);
            });
    }

    /**
     * Validate if the input date is in the correct format and within the valid range.
     * @param {string} dateString - The date string to validate.
     * @returns {boolean} - True if the date is valid, false otherwise.
     */
    function isValidDate(dateString) {
        const datePattern = /^\d{4}-\d{2}-\d{2}$/;
        if (!datePattern.test(dateString)) {
            return false;
        }

        const date = new Date(dateString);
        const earliestDate = new Date('1995-06-16');
        const today = new Date();

        return date >= earliestDate && date <= today;
    }
});
// have to figure out a video player as some APODs are video //