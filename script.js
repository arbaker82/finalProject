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

    // Fetch APOD for a specific date
    searchBtn.addEventListener('click', () => {
        const date = searchDate.value;
        if (date) {
            fetchAPOD(date);
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
                apodImg.src = data.url;
                apodTitle.textContent = data.title;
                apodDate.textContent = data.date;
                apodDesc.textContent = data.explanation;
            })
            .catch(error => {
                console.error('Error fetching APOD:', error);
            });
    }
});
