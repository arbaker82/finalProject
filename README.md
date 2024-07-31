# NASA Astronomy Picture of the Day (APOD) Viewer

## ** API security credentials sent on turn-in Google Form.  This project needs an ENV file located in the /root directory with the NASA API Key. **

## Project Description
The NASA Astronomy Picture of the Day (APOD) Viewer is a web application that allows users to view, search, and analyze the daily astronomical images and videos provided by NASA. The application displays the image of the day, allows users to search for images by date, and provides additional information about each image.  It is also capable of aggregating all APODs throughout the years for a given mm/dd. An example would be the user's birthday. All API images are clickable, creating a new tab with a hi-res version of the image.

## Features
- View the NASA Astronomy Picture of the Day (APOD) along with date, title and description.
- Search for APOD images by date.
- Aggregate and display all APODs for a given mm/dd date. (ex. 'Your Birthday')
- Responsive design for both mobile and desktop.

## Requirements Met 
### There are code comments for Requirements // (REQUIREMENT 1) 
1.	Use arrays, objects, sets, or maps to store and retrieve information that is displayed in your app.
	•	Met: In birthday.js, an array years is used to store the years for which APODs are fetched.
	•	Met: In birthday.js, the monthDayMap object is used to validate the day based on the selected month.
2.	Analyze data that is stored in arrays, objects, sets, or maps and display information about it in your app.
	•	Met: In birthday.js, the function displayBirthdayAPODs iterates over the apods array to display the APODs in the carousel.
3.	Use a regular expression to validate user input and either prevent the invalid input or inform the user about it in all cases prevent invalid input.
	•	Met: In server.js, regular expressions dateRegex, monthRegex, and dayRegex are used to validate date input.
	•	Met: In script.js, the dateRegex is used to validate the date input for fetching APODs.
4.	Create a function that accepts two or more input parameters and returns a value that is calculated or determined by the inputs.
	•	Met: In birthday.js, the function isValidDate accepts month and day as input parameters and determines if the date is valid based on monthDayMap.
5.	Retrieve data from a third-party API and use it to display something within your app.
	•	Met: In server.js, the endpoints /apod and /birthday-apods fetch data from the NASA APOD API.
	•	Met: In script.js and birthday.js, the fetched data is displayed on the web page.
6.	Create a Node.js web server using a modern framework such as Express.js or Fastify. Serve at least one route.
	•	Met: In server.js, an Express.js server is created and serves routes /apod and /birthday-apods.

## Dependencies: Node, Express, node-fetch, dotenv
	
## Instructions to Run the Project 

1. Clone the repository.
	# Terminal command:
	git clone https://github.com/arbaker82/finalProject.git

2. Install Node.js from https://nodejs.org/en/download/prebuilt-installer/current
   
3. Create ENV file with Nasa API Data sent in turn-in form and place it in the /root directory.

4.  Input terminal commands to initialize npm, install express, node-fetch and dotenv for environment variables. 
  
  # Terminal Commands:
    npm init -y
    npm install express
	npm install node-fetch
    npm install dotenv

 5. Start server with terminal command:
	node server.js

6. Point browser to http://localhost:3000
