document.addEventListener('DOMContentLoaded', () => {
    const apodImg = document.getElementById('apod-img');
    const apodVideo = document.getElementById('apod-video');
    const apodTitle = document.getElementById('apod-title');
    const apodDate = document.getElementById('apod-date');
    const apodDesc = document.getElementById('apod-desc');
    const searchDate = document.getElementById('search-date');
    const searchBtn = document.getElementById('search-btn');
    const loadingSpinner = document.getElementById('loading-spinner');

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // Regular expression to validate date (REQUIREMENT 3)

    const startDate = new Date('1995-06-16');
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Function to check if a date is within the valid range (REQUIREMENT 4)
    const isDateValid = (date) => {
        const inputDate = new Date(date);
        return inputDate >= startDate && inputDate <= today;
    };

    // Function to show the loading spinner
    const showLoadingSpinner = () => {
        loadingSpinner.hidden = false;
    };

    // Function to hide the loading spinner
    const hideLoadingSpinner = () => {
        loadingSpinner.hidden = true;
    };

    // Function to fetch APOD data
    const fetchAPOD = async (date) => {
        if (!dateRegex.test(date)) {
            alert('Invalid date format. Please use YYYY-MM-DD.');
            return;
        }

        if (!isDateValid(date)) {
            alert(`Date must be between ${startDate.toISOString().split('T')[0]} and ${today.toISOString().split('T')[0]}. Please try again.`);
            return;
        }

        showLoadingSpinner();
        try {
            const response = await fetch(`/apod?date=${date}`); // API call to the server (REQUIREMENT 5)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            displayAPOD(data); // Display the fetched APOD data
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            hideLoadingSpinner();
        }
    };

    // Function to display APOD data
    const displayAPOD = (data) => {
        apodTitle.textContent = data.title;
        apodDate.textContent = data.date;
        apodDesc.textContent = data.explanation;

        if (data.media_type === 'image') {
            apodImg.src = data.url;
            apodImg.alt = data.title;
            apodImg.style.display = 'block';
            apodVideo.style.display = 'none';
            apodImg.dataset.hires = data.hdurl;
        } else if (data.media_type === 'video') {
            apodVideo.src = data.url;
            apodVideo.style.display = 'block';
            apodImg.style.display = 'none';
        }
    };

    // Event listener for image click to open high-resolution image
    apodImg.addEventListener('click', () => {
        const hiresUrl = apodImg.dataset.hires;
        if (hiresUrl) {
            window.open(hiresUrl, '_blank');
        }
    });

    // Event listener for the search button
    searchBtn.addEventListener('click', () => {
        const date = searchDate.value;
        if (date) {
            fetchAPOD(date);
        } else {
            alert('Please select a date');
        }
    });

    // Ensure the initial date is not a future date
    const initialDate = new Date().toISOString().split('T')[0];
    if (isDateValid(initialDate)) {
        fetchAPOD(initialDate);
    } else {
        fetchAPOD(today.toISOString().split('T')[0]);
    }
});