# **NASA Astronomy Picture of the Day (APOD) Viewer**

## ** API security credentials sent on turn-in Google Form.  This project needs an ENV file located in the /root directory with the NASA API Key. **

## Project Description
The NASA Astronomy Picture of the Day (APOD) Viewer is a web application that allows users to view, search, and analyze the daily astronomical images and videos provided by NASA. The application displays the image of the day, allows users to search for images by date, and provides additional information about each image.  It is also capable of aggregating all APODs throughout the years for a given mm/dd. An example would be the user's birthday. All API images are clickable, creating a new tab with a hi-res version of the image.

## Features
- View the NASA Astronomy Picture of the Day (APOD) along with date, title and description.
- Search for APOD images by date.
- Aggregate and display all APODs for a given mm/dd date. (ex. 'Your Birthday')
- Responsive design for both mobile and desktop.

## Requirements Met 
### There are code comments for Requirements // ex. (REQUIREMENT 1) 

1.	REQUIREMENT 1: Use arrays, objects, sets or maps to store and retrieve information that is displayed in the app.
	-	This is satisfied with the monthDayMap object in the isValidDate function.
2.	REQUIREMENT 2: Analyze data that is stored in arrays, objects, sets or maps and display information about it in the app.
	-	This is satisfied in the displayBirthdayAPODs function where the fetched APODs are displayed.
3.	REQUIREMENT 3: Use a regular expression to validate user input and either prevent the invalid input or inform the user about it in their server.js, birthday.js, and script.js files.
	-	This is satisfied in server.js with the regular expressions for validating date, month, and day.
4.	REQUIREMENT 4: Analyze text and display useful information about it.
	-	This is satisfied with the isValidDate function in both server.js and birthday.js.
5.	REQUIREMENT 5: Create a function that accepts two or more input parameters and returns a value that is determined by the inputs.
	-	This is satisfied with the fetchAPOD and displayBirthdayAPODs functions.
6.	REQUIREMENT 6: Retrieve data from a third-party API and use it to display something in the app.
	-	This is satisfied with the API calls to fetch APOD data in both server.js and birthday.js.

## Dependencies: Node, Express, node-fetch, dotenv
	
## Instructions to Run the Project 

1. Navigate to your project folder and clone the repository.
	`git clone https://github.com/arbaker82/finalProject.git`

2. Install Node.js from https://nodejs.org/en/download/prebuilt-installer/current
   
3. Create ENV file with Nasa API Data sent in turn-in form and place it in the /root directory.

4.  Input terminal commands to initialize npm, install express, node-fetch and dotenv for environment variables. 
	`npm init -y`
	`npm install express`
	`npm install node-fetch`
    `npm install dotenv` 

5. Start server with 
	`node server.js`

6. Point browser to http://localhost:3000
