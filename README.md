# Periodic Tables Restaurant Reservation Management System
### Submitted for the final capstone of Thinkful's software engineering program

Thank you for looking at my project!


## Link to deployed app
https://thinkful-restaurant-capstone.herokuapp.com/ contains a live version of the app. Please allow up to 30 seconds for initial loading, as Heroku can be pokey on the initial load.

## Documentation of the API

The API of the app adheres to RESTful conventions. It has the following endpoints & requires all requests to be in JSON format:

/reservations
This accepts GET and POST requests

GET requests - must contain either a mobile_number or a data query parameter, i.e. /reservations?mobile_number=xxx-xxx-xxx or /reservations?date=YYYY-MM-DD. Will return an array of reservations matching the search parameters.

POST requests - creates a new reservation, requires a set of fields including first_name, last_name, mobile_number, reservation_date, reservation_time, people, and status. Returns the new reservation as saved in the database.

/reservations/:reservation_id
This accepts GET and PUT requests

GET requests - returns the single reservation with the requested id. No body is needed in the request.

PUT requests - updates the requested reservation, though the request must satisfy the requirements for creating a new reservation including required fields.

/reservations/:reservation_id/status
This accepts PUT requests

PUT requests - updates only the status for a given reservation, as when seated, cancelled, or finished.

/tables
This accepts GET and POST requests

GET requests - Provides an array including every table.

POST requests - Creates a new table, which requires a table_name and a capacity, which must be an integer.

/tables/:table/seat
This accepts PUT and DELETE requests

PUT requests - This adds a reservation_id to the table, which indicates which party is seated there.

DELETE requests - This removes the reservation_id from the table, and changes the status of the reservation to "finished"

## Screenshots of application

## Summary section explaining features from a user standpoint

## Technology used

The front end was built with React 17.0.1 and was styled with Bootstrap

The API was built with Node and Express in JS

The database is PostgreSQL and hosted by ElephantSQL.

## Installation instructions
You will need to have Node installed on your machine. Run `npm install` in the root directory, then in the back-end subfolder, run

~~~
npx migrate:latest

npx knex seed:run

npm start
~~~

to get the back end running, then run `npm start` in the front-end subfolder.