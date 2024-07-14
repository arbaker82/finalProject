document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'oedgW1nDvvL0CMEsXv6wpIZ3D2ECcMPRlOF357sZ';
    const searchBtn = document.getElementById('search-btn');
    const monthInput = document.getElementById('month');
    const dayInput = document.getElementById('day');
    const carousel = document.getElementById('carousel');

    searchBtn.addEventListener('click', () => {
        const month = monthInput.value;
        const day = dayInput.value;
        if (isValidDate(month, day)) {
            fetchAPODsForBirthday(month, day);
        } else {
            alert('Please enter a valid date.');
        }
    });

    function isValidDate(month, day) {
        return /^[01]\d$/.test(month) && /^[0-3]\d$/.test(day) && day <= 31;
    }

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

    async function fetchAPOD(date) {
        const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;
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

    function displayCarousel(apods) {
        carousel.innerHTML = '';  // Clear previous images
        apods.forEach(apod => {
            if (apod) {
                const mediaElement = document.createElement(apod.media_type === 'image' ? 'img' : 'iframe');
                mediaElement.src = apod.url;
                mediaElement.alt = apod.title;
                if (apod.media_type === 'video') {
                    mediaElement.width = "560";
                    mediaElement.height = "315";
                    mediaElement.frameBorder = "0";
                    mediaElement.allowFullscreen = true;
                }
                carousel.appendChild(mediaElement);
            }
        });
    }
});