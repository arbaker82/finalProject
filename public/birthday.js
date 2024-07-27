document.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.getElementById("search-btn");
    const monthSelect = document.getElementById("month");
    const daySelect = document.getElementById("day");
    const carousel = document.getElementById("carousel");

    searchBtn.addEventListener("click", async () => {
        const month = monthSelect.value;
        const day = daySelect.value;

        // Validate the date
        if (!isValidDate(month, day)) {
            alert("Invalid date. Please enter a valid month and day.");
            return;
        }

        try {
            const response = await fetch(`/birthday-apods?month=${month}&day=${day}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            displayBirthdayAPODs(data);
        } catch (error) {
            console.error('Fetch error:', error);
            alert('Failed to fetch birthday APODs. Please try again later.');
        }
    });

    function isValidDate(month, day) {
        const monthDayMap = {
            "01": 31, "02": 29, "03": 31, "04": 30,
            "05": 31, "06": 30, "07": 31, "08": 31,
            "09": 30, "10": 31, "11": 30, "12": 31
        };
        return day <= monthDayMap[month];
    }

    function displayBirthdayAPODs(apods) {
        carousel.innerHTML = ""; // Clear any existing content

        apods.forEach(apod => {
            const apodContainer = document.createElement("div");
            apodContainer.className = "apod-container";

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

            const title = document.createElement("h3");
            title.textContent = apod.title;
            apodContainer.appendChild(title);

            const date = document.createElement("p");
            date.textContent = apod.date;
            apodContainer.appendChild(date);

            const desc = document.createElement("p");
            desc.textContent = apod.explanation;
            apodContainer.appendChild(desc);

            carousel.appendChild(apodContainer);
        });
    }
});