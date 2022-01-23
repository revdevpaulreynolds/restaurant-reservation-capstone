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

## User guide

![Screenshot](screenshots/Screenshot%202022-01-22%209.27.12%20PM.png)
Displays all reservations on a given day with navigation buttons to change the date. This is the default page when visiting the app.

Each reservation that has a status of "booked" will display a button to Seat, as well as buttons to Edit or Cancel the given reservation.

The tables information below displays each table in the restaurant along with its availability status.

Going to the "New Reservation" page in the navigation shows this page:

![Screenshot](screenshots/Screenshot%202022-01-22%209.35.03%20PM.png)

Adding a new reservation that meets the requirements and clicking Submit will save the reservation and redirect back to the dashboard page for the reservation made.

Once back on the main page, to seat a reservation, click the Seat button next to an eligible reservation, which will bring you to this screen:

![Screenshot](screenshots/Screenshot%202022-01-22%209.40.58%20PM.png)

Once an eligible table with an eligible amount of seats has been selected, the party can be seated, and the button is hidden from the dashboard view.

To add a new table, click the New Table link on the left, and you will see this screen:

![Screenshot](screenshots/Screenshot%202022-01-22%209.43.15%20PM.png)

As long as the table name is 2+ characters and the capacity is more than 1, the new table can be created.


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