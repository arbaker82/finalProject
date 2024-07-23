document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'oedgW1nDvvL0CMEsXv6wpIZ3D2ECcMPRlOF357sZ';

    // Elements for displaying APOD
    const apodImg = document.getElementById('apod-img');
    const apodVideo = document.getElementById('apod-video');
    const apodTitle = document.getElementById('apod-title');
    const apodDate = document.getElementById('apod-date');
    const apodDesc = document.getElementById('apod-desc');

    // Elements for date input
    const searchDate = document.getElementById('search-date');
    const searchBtn = document.getElementById('search-btn');

    const datePattern = /^\d{4}-\d{2}-\d{2}$/; // REQ 3. Regular expression for date validation.

    searchBtn.addEventListener('click', () => {
        const date = searchDate.value;
        if (isValidDate(date)) {
            fetchAPOD(date); // REQ 6. Fetch data from the API.
        } else {
            alert('Please enter a valid date. Ensure the date is between June 16, 1995 (First APOD released) and today.'); // Inform the user about invalid input.
        }
    });

    // Function to validate date
    function isValidDate(dateString) {
        if (!datePattern.test(dateString)) return false; // Validate date format.

        const date = new Date(dateString);
        const earliestDate = new Date('1995-06-16');
        const today = new Date();

        return date >= earliestDate && date <= today;
    }

    // Function to fetch APOD data for a specific date
    async function fetchAPOD(date = '') {
        const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}${date ? `&date=${date}` : ''}`;
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Error fetching APOD for ${date}`);

            const data = await response.json(); // Fetch data from the API.
            displayAPOD(data); // Use the fetched data to update the UI.
        } catch (error) {
            console.error('Error fetching APOD:', error);
        }
    }

    // Function to display the fetched APOD data
    function displayAPOD(data) {
        apodTitle.textContent = data.title; // REQ 4. Display APOD title.
        apodDate.textContent = data.date; // Display APOD date.
        apodDesc.textContent = data.explanation; // Display APOD description.

        if (data.media_type === 'image') {
            apodImg.src = data.url;
            apodImg.style.display = 'block';
            apodImg.parentElement.href = data.hdurl || data.url; // Use high-resolution URL if available
            apodVideo.style.display = 'none';
        } else if (data.media_type === 'video') {
            apodVideo.src = data.url;
            apodVideo.style.display = 'block';
            apodImg.style.display = 'none';
        }
    }

    fetchAPOD(); // Fetch today's APOD on page load.
});