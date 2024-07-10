document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'oedgW1nDvvL0CMEsXv6wpIZ3D2ECcMPRlOF357sZ';

    const elements = {
        apodImg: document.getElementById('apod-img'),
        apodTitle: document.getElementById('apod-title'),
        apodDate: document.getElementById('apod-date'),
        apodDesc: document.getElementById('apod-desc'),
        searchDate: document.getElementById('search-date'),
        searchBtn: document.getElementById('search-btn')
    };

    fetchAPOD();

    elements.searchBtn.addEventListener('click', () => {
        const date = elements.searchDate.value;
        if (isValidDate(date)) {
            fetchAPOD(date);
        } else {
            alert('Please enter a valid date in YYYY-MM-DD format within the range from 1995-06-16 to today.');
        }
    });

    function fetchAPOD(date = '') {
        let url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
        if (date) {
            url += `&date=${date}`;
        }

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.media_type === 'image') {
                    elements.apodImg.src = data.url;
                    elements.apodImg.style.display = 'block';
                    elements.apodDesc.innerHTML = data.explanation;
                } else if (data.media_type === 'video') {
                    elements.apodImg.style.display = 'none';
                    elements.apodDesc.innerHTML = `<iframe src="${data.url}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
                }
                elements.apodTitle.textContent = data.title;
                elements.apodDate.textContent = data.date;
            })
            .catch(error => {
                console.error('Error fetching APOD:', error);
            });
    }

    function isValidDate(dateString) {
        const datePattern = /^\d{4}-\d{2}-\d{2}$/;
        if (!datePattern.test(dateString)) return false;

        const date = new Date(dateString);
        const earliestDate = new Date('1995-06-16');
        const today = new Date();

        return date >= earliestDate && date <= today;
    }
});