# NASA Astronomy Picture of the Day (APOD) Viewer

## Project Description
The NASA Astronomy Picture of the Day (APOD) Viewer is a web application that allows users to view, search, and analyze the daily astronomical images provided by NASA. The application displays the image of the day, allows users to search for images by date, and provides additional information about each image.  It is also capable of aggregating all APODs throughout the years for a given mm/dd. An example would be the user's birthday.

## Features
- View the NASA Astronomy Picture of the Day (APOD) along with date, title and description.
- Search for APOD images by date.
- Aggregate and display all APODs for a given mm/dd date. (ex. 'Your Birthday')
- Responsive design for both mobile and desktop.

## Requirements met	
    REQ 1: Use arrays, objects, sets, or maps to store and retrieve information that is displayed in your app.
	    •	Arrays are used to store years (const years = Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i);).
	    •	Objects are used to store and display APOD data (const data = await response.json();).
		
	REQ 2: Analyze data that is stored in arrays, objects, sets, or maps and display information about it in your app.
	    •	The apodData array is analyzed and displayed in a carousel format.
	    •	The data object is analyzed and displayed with APOD’s title, date, and description.
		
	REQ 3: Use a regular expression to validate user input and either prevent the invalid input or inform the user about it.
	    •	Server-side validation:
	    •	Date validation regex: const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
	    •	Month validation regex: const monthRegex = /^(0[1-9]|1[0-2])$/;
	    •	Day validation regex: const dayRegex = /^(0[1-9]|[12][0-9]|3[01])$/;
	    •	Client-side validation:
	    •	Month and day validation regex: const monthRegex = /^(0[1-9]|1[0-2])$/; and const dayRegex = /^(0[1-9]|[12][0-9]|3[01])$/;
	    •	Validation checks for input values.
		
	REQ 4: Analyze text and display useful information about it.
	    •	APOD’s title, date, and description are analyzed and displayed in the UI.
		
	REQ 5: Create a function that accepts two or more input parameters and returns a value that is calculated or determined by the inputs.
	    •	Function fetchAPODsForBirthday(month, day) to fetch and display APODs based on input parameters.
	    •	Function fetchAPOD(date) to fetch and display APOD based on the date parameter.
		
	REQ 6: Retrieve data from a third-party API and use it to display something within your app.
	    •	Fetching APOD data from NASA API for both specific dates and birthdays across multiple years.
		
	REQ 7: Create a Node.js web server using a modern framework such as Express.js or Fastify. Serve at least one route.
	    •	Express server with /apod and /birthday-apods routes.

## Dependencies: Node, Express, dotenv

## Instructions to Run the Project 

1. Clone the repository.

2. Install Node.js from https://nodejs.org/en/download/prebuilt-installer/current
   
3. Input terminal commands to initialize npm, install express and dotenv. 
    # Terminal Commands
    npm init -y
    npm install express
    npm install dotenv

4. Point browser to http://localhost:3000.
