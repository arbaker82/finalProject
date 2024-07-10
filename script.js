document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'oedgW1nDvvL0CMEsXv6wpIZ3D2ECcMPRlOF357sZ';
    const apodImg = document.getElementById('apod-img');
    const apodTitle = document.getElementById('apod-title');
    const apodDate = document.getElementById('apod-date');
    const apodDesc = document.getElementById('apod-desc');
    const searchDate = document.getElementById('search-date');
    const searchBtn = document.getElementById('search-btn');

    fetchAPOD();

    searchBtn.addEventListener('click', () => {
        const date = searchDate.value;
        if (isValidDate(date)) {
            fetchAPOD(date);
        } else {
            alert('Please enter a valid date in YYYY-MM-DD format within the range from 1995-06-16 to today.');
        }
    });

    function fetchAPOD(date = '') {
        const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}${date ? `&date=${date}` : ''}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                apodImg.src = data.url;
                apodTitle.textContent = data.title;
                apodDate.textContent = data.date;
                apodDesc.textContent = data.explanation;
            })
            .catch(error => console.error('Error fetching APOD:', error));
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