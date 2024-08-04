document.addEventListener("DOMContentLoaded", () => {
    // Get references to DOM elements
    const searchBtn = document.getElementById("search-btn");
    const monthSelect = document.getElementById("month");
    const daySelect = document.getElementById("day");
    const carousel = document.getElementById("carousel");
    const loadingSpinner = document.getElementById('loading-spinner');

    // Function to show the loading spinner
    const showLoadingSpinner = () => {
        loadingSpinner.hidden = false;
    };

    // Function to hide the loading spinner
    const hideLoadingSpinner = () => {
        loadingSpinner.hidden = true;
    };

    // Add click event listener to the search button
    searchBtn.addEventListener("click", async () => {
        const month = monthSelect.value;
        const day = daySelect.value;

        // Validate the date
        if (!isValidDate(month, day)) { // (REQUIREMENT 4)
            alert("Invalid date. Please enter a valid month and day.");
            return;
        }

        showLoadingSpinner();
        try {
            // Fetch APOD data for the given month and day from the server
            const response = await fetch(`/birthday-apods?month=${month}&day=${day}`); // (REQUIREMENT 5)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json(); // Parse JSON data
            displayBirthdayAPODs(data); // Display the APODs in the carousel
        } catch (error) {
            alert('Failed to fetch birthday APODs. Please try again later.');
        } finally {
            hideLoadingSpinner();
        }
    });

    // Function to validate the date
    function isValidDate(month, day) { // (REQUIREMENT 4)
        const monthDayMap = { // (REQUIREMENT 1)
            "01": 31, "02": 29, "03": 31, "04": 30,
            "05": 31, "06": 30, "07": 31, "08": 31,
            "09": 30, "10": 31, "11": 30, "12": 31
        };
        return day <= monthDayMap[month]; // Check if the day is valid for the given month
    }

    // Function to display the fetched APODs in the carousel
    function displayBirthdayAPODs(apods) { // (REQUIREMENT 2)
        carousel.innerHTML = ""; // Clear any existing content

        apods.forEach(apod => {
            const apodContainer = document.createElement("div");
            apodContainer.className = "apod-container";

            // Display image or video based on the media type
            if (apod.media_type === "image") {
                const img = document.createElement("img");
                img.src = apod.url;
                img.alt = apod.title;
                img.className = "apod-img";
                img.addEventListener("click", () => {
                    window.open(apod.hdurl || apod.url, "_blank");
                });
                apodContainer.appendChild(img);
            } else if (apod.media_type === "video") {
                const iframe = document.createElement("iframe");
                iframe.src = apod.url;
                iframe.frameBorder = "0";
                iframe.allowFullscreen = true;
                apodContainer.appendChild(iframe);
            }

            // Add title, date, and description to the APOD container
            const title = document.createElement("h3");
            title.textContent = apod.title;
            apodContainer.appendChild(title);

            const date = document.createElement("p");
            date.textContent = apod.date;
            apodContainer.appendChild(date);

            const desc = document.createElement("p");
            desc.textContent = apod.explanation;
            apodContainer.appendChild(desc);

            carousel.appendChild(apodContainer); // Add the APOD container to the carousel
        });
    }
});