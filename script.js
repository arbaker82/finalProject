// Fetch APOD data from NASA API
fetch('https://api.nasa.gov/planetary/apod?api_key=oedgW1nDvvL0CMEsXv6wpIZ3D2ECcMPRlOF357sZ')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Process the data received from the API
        console.log(data); // Log the data to see its structure
        
        // Update website's HTML with this data
        document.getElementById('apod-title').textContent = data.title;
        document.getElementById('apod-image').src = data.hdurl;
        document.getElementById('apod-explanation').textContent = data.explanation;
    })
    .catch(error => {
        console.error('Error fetching data from NASA API', error);
    });
