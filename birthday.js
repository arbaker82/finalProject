document.addEventListener('DOMContentLoaded', () => {
    // Your NASA API key
    const apiKey = 'oedgW1nDvvL0CMEsXv6wpIZ3D2ECcMPRlOF357sZ';

    // DOM elements for the birthday search
    const searchBtn = document.getElementById('search-btn');
    const monthInput = document.getElementById('month');
    const dayInput = document.getElementById('day');
    const carousel = document.getElementById('carousel');

    // Event listener for the search button
    searchBtn.addEventListener('click', () => {
        const month = monthInput.value;
        const day = dayInput.value;
        if (isValidDate(month, day)) {
            fetchAPODsForBirthday(month, day);
        } else {
            alert('Please enter a valid date.');
        }
    });

    // Function to validate the date
    function isValidDate(month, day) {
        // Check if the month and day are valid
        return /^[01]\d$/.test(month) && /^[0-3]\d$/.test(day) && day <= 31;
    }

    // Function to fetch APODs for the specified birthday
    async function fetchAPODsForBirthday(month, day) {
        const startYear = 1995; // The year the first APOD was released
        const endYear = new Date().getFullYear();
        const promises = [];

        // Create a list of promises to fetch APODs for each year from startYear to endYear
        for (let year = startYear; year <= endYear; year++) {
            const date = `${year}-${month}-${day}`;
            promises.push(fetchAPOD(date));
        }

        // Wait for all promises to resolve and filter out null results
        const apods = await Promise.all(promises);
        displayCarousel(apods.filter(apod => apod));
    }

    // Function to fetch APOD data for a specific date from NASA API
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

    // Function to display the fetched APOD data in a carousel
    function displayCarousel(apods) {
        carousel.innerHTML = '';  // Clear previous images
        apods.forEach(apod => {
            if (apod) {
                // Create an image or video element based on the media type
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

/*  This JavaScript file handles fetching and displaying
APODs for a specific birthday across multiple years. */

/*  1.	Event Listener: The DOMContentLoaded event ensures
      the code runs only after the DOM is fully loaded.
	2.	API Key: The API key required to fetch data from the
      NASA APOD API.
	3.	DOM Elements: Variables to store references to HTML
      elements where the user will input their birthday and
      where the APOD carousel will be displayed.
	4.	Search Button: Adds a click event listener to the
      search button. When clicked, it retrieves the month and
      day from the input fields and calls the
      fetchAPODsForBirthday function if the date is valid.
	5.	Date Validation: The isValidDate function checks if
      the entered month and day are in the correct format.
	6.	Fetch APODs for Birthday: The fetchAPODsForBirthday
      function creates an array of promises to fetch APODs 
      for the selected birthday across multiple years.
	7.	Fetch APOD: The fetchAPOD function makes an API
      request to fetch APOD data for a specific date.
	8.	Display Carousel: The displayCarousel function
      updates the carousel with the fetched APODs. It handles
      both images and videos, displaying the appropriate
      media type.  */