document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'oedgW1nDvvL0CMEsXv6wpIZ3D2ECcMPRlOF357sZ';
    const searchBtn = document.getElementById('search-btn');
    const birthdayInput = document.getElementById('birthday');
    const carousel = document.getElementById('carousel');

    searchBtn.addEventListener('click', () => {
        const birthday = birthdayInput.value;
        if (isValidDate(birthday)) {
            fetchAPODsForBirthday(birthday);
        } else {
            alert('Please enter a valid date.');
        }
    });

    function isValidDate(dateString) {
        return /^\d{4}-\d{2}-\d{2}$/.test(dateString);
    }

    async function fetchAPODsForBirthday(birthday) {
        const startYear = 1995;
        const endYear = new Date().getFullYear();
        const [month, day] = birthday.split('-').slice(1);
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
            if (apod.media_type === 'image') {
                const img = document.createElement('img');
                img.src = apod.url;
                img.alt = apod.title;
                carousel.appendChild(img);
            }
        });
    }
});