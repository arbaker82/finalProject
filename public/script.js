document.addEventListener('DOMContentLoaded', () => {
    // Elements for displaying APOD
    const apodImg = document.getElementById('apod-img');
    const apodVideo = document.getElementById('apod-video');
    const apodTitle = document.getElementById('apod-title');
    const apodDate = document.getElementById('apod-date');
    const apodDesc = document.getElementById('apod-desc');

    // Elements for date input
    const searchDate = document.getElementById('search-date');
    const searchBtn = document.getElementById('search-btn');

    // Regular expression for validating date in YYYY-MM-DD format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // REQ 3

    // Fetch APOD data from the server
    const fetchAPOD = async (date) => {
        // REQ 3: Validate date parameter using regex
        if (!dateRegex.test(date)) {
            alert('Invalid date format. Please use YYYY-MM-DD.');
            return;
        }

        try {
            const response = await fetch(`/apod?date=${date}`); // REQ 5
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            displayAPOD(data);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    // Display APOD data
    const displayAPOD = (data) => {
        apodTitle.textContent = data.title;
        apodDate.textContent = data.date;
        apodDesc.textContent = data.explanation;

        if (data.media_type === 'image') {
            apodImg.src = data.url;
            apodImg.alt = data.title;
            apodImg.style.display = 'block';
            apodVideo.style.display = 'none';
        } else if (data.media_type === 'video') {
            apodVideo.src = data.url;
            apodVideo.style.display = 'block';
            apodImg.style.display = 'none';
        }
    };

    // Event listener for search button
    searchBtn.addEventListener('click', () => {
        const date = searchDate.value;
        if (date) {
            fetchAPOD(date); // REQ 4
        } else {
            alert('Please select a date');
        }
    });

    // Initial fetch for today's APOD
    fetchAPOD(new Date().toISOString().split('T')[0]); // REQ 5
});