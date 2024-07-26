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

    // Fetch APOD data from the server
    const fetchAPOD = async (date) => {
        try {
            const response = await fetch(`/apod?date=${date}`);
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
            fetchAPOD(date);
        } else {
            alert('Please select a date');
        }
    });

    // Initial fetch for today's APOD
    fetchAPOD(new Date().toISOString().split('T')[0]);
});