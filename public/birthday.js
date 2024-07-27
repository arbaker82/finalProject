document.addEventListener('DOMContentLoaded', () => {
    // Elements for birthday input
    const monthSelect = document.getElementById('month');
    const daySelect = document.getElementById('day');
    const searchBtn = document.getElementById('search-btn');
    const carousel = document.getElementById('carousel');

    // Regular expressions for validating month and day
    const monthRegex = /^(0[1-9]|1[0-2])$/;
    const dayRegex = /^(0[1-9]|[12][0-9]|3[01])$/;

    // Fetch APOD data from the server for a range of years
    const fetchAPODsForBirthday = async (month, day) => {
        // Validate month and day parameters using regex
        if (!monthRegex.test(month)) {
            alert('Invalid month. Please select a valid month.');
            return;
        }
        if (!dayRegex.test(day)) {
            alert('Invalid day. Please select a valid day.');
            return;
        }

        try {
            const response = await fetch(`/birthday-apods?month=${month}&day=${day}`);
            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Fetch error: ${errorText}`);
                throw new Error(`Network response was not ok: ${errorText}`);
            }
            const apodData = await response.json();
            displayAPODs(apodData);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    // Display APODs in the carousel
    const displayAPODs = (apodData) => {
        carousel.innerHTML = ''; // Clear existing content

        if (apodData.length === 0) {
            const message = document.createElement('p');
            message.textContent = 'No APODs available for the selected date range.';
            carousel.appendChild(message);
            return;
        }

        apodData.forEach((apod) => {
            const div = document.createElement('div');
            div.className = 'carousel-item';

            const img = document.createElement('img');
            img.src = apod.url;
            img.alt = apod.title;
            img.className = 'carousel-image';

            const title = document.createElement('h3');
            title.textContent = apod.title;
            title.className = 'carousel-title';

            const date = document.createElement('p');
            date.textContent = apod.date;
            date.className = 'carousel-date';

            const desc = document.createElement('p');
            desc.textContent = apod.explanation;
            desc.className = 'carousel-description';

            div.appendChild(img);
            div.appendChild(title);
            div.appendChild(date);
            div.appendChild(desc);

            carousel.appendChild(div);
        });
    };

    // Event listener for search button
    searchBtn.addEventListener('click', () => {
        const month = monthSelect.value;
        const day = daySelect.value;
        if (month && day) {
            fetchAPODsForBirthday(month, day);
        } else {
            alert('Please select both month and day');
        }
    });
});