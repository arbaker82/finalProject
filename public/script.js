document.addEventListener('DOMContentLoaded', () => {
    const apodImg = document.getElementById('apod-img');
    const apodVideo = document.getElementById('apod-video');
    const apodTitle = document.getElementById('apod-title');
    const apodDate = document.getElementById('apod-date');
    const apodDesc = document.getElementById('apod-desc');
    const searchDate = document.getElementById('search-date');
    const searchBtn = document.getElementById('search-btn');

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    const startDate = new Date('1995-06-16');
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const isDateValid = (date) => {
        const inputDate = new Date(date);
        return inputDate >= startDate && inputDate <= today;
    };

    const fetchAPOD = async (date) => {
        if (!dateRegex.test(date)) {
            alert('Invalid date format. Please use YYYY-MM-DD.');
            return;
        }

        if (!isDateValid(date)) {
            alert(`Date must be between ${startDate.toISOString().split('T')[0]} and ${today.toISOString().split('T')[0]}. Please try again.`);
            return;
        }

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

    apodImg.addEventListener('click', () => {
        const hiresUrl = apodImg.dataset.hires;
        if (hiresUrl) {
            window.open(hiresUrl, '_blank');
        }
    });

    searchBtn.addEventListener('click', () => {
        const date = searchDate.value;
        if (date) {
            fetchAPOD(date);
        } else {
            alert('Please select a date');
        }
    });

    fetchAPOD(new Date().toISOString().split('T')[0]);
});