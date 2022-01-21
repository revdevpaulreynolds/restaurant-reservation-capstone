import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import {
  formatAsTime,
  formatAsDate,
  previous,
  next,
  today,
} from "../utils/date-time";
import useQuery from "../utils/useQuery";
import TableList from "./TableList";
import CancelButton from "../Reservations/CancelButton";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  // let isToday = true; // Sometime in the future I want the seat button
  // to only display if the date is today
  const query = useQuery();
  const getDate = query.get("date");

  if (getDate && getDate !== today()) {
    date = getDate;
    // isToday = false;
  }

  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadDashboard, [date]);
  console.log("rerendered")

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  const displayDate = formatAsDate(date);

  const history = useHistory();

  const previousDate = previous(date);
  const nextDate = next(date);

  function pushDate(dateToMove) {
    history.push(`/dashboard?date=${dateToMove}`);
  }

  let result = reservations.filter((reservation) => {
    return (
      reservation.status !== "finished" && reservation.status !== "cancelled"
    );
  });

  const display = result.map((reservation) => {
    return (
      <tr key={reservation.reservation_id}>
        <td>{reservation.reservation_id}</td>
        <td>{reservation.first_name}</td>
        <td>{reservation.last_name}</td>
        <td>{reservation.mobile_number}</td>
        <td>{formatAsTime(reservation.reservation_time)}</td>
        <td>{reservation.people}</td>
        <td data-reservation-id-status={reservation.reservation_id}>
          {reservation.status}
        </td>
        <td>
          {reservation.status === "booked" ? (
            <a
              className="btn btn-primary"
              href={`/reservations/${reservation.reservation_id}/seat`}
            >
              Seat
            </a>
          ) : null}
        </td>
        <td>
          {" "}
          {reservation.status === "booked" ? (
            <Link
              to={{
                pathname: `/reservations/${reservation.reservation_id}/edit`,
              }}
            >
              <button className="btn btn-secondary">Edit</button>
            </Link>
          ) : null}
        </td>
        <td>
          <CancelButton reservation_id={reservation.reservation_id} />
        </td>
      </tr>
    );
  });

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {displayDate}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <div className="btn-group" role="group" aria-label="Pick a date">
        <button
          className="btn btn-primary"
          onClick={() => pushDate(previousDate)}
        >
          Back
        </button>
        <button
          className="btn btn-primary"
          onClick={() => history.push("/dashboard")}
        >
          Today
        </button>
        <button className="btn btn-primary" onClick={() => pushDate(nextDate)}>
          Forward
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Mobile number</th>
            <th scope="col">Reservation time</th>
            <th scope="col">Party size</th>
            <th scope="col">Status</th>
            <th scope="col">Seat party</th>
            <th scope="col">Edit</th>
            <th scope="col">Cancel</th>
          </tr>
        </thead>
        <tbody>{reservations.length > 0 && display}</tbody>
      </table>
      {!reservations.length && <h3>No reservations on this date</h3>}
      <TableList />
    </main>
  );
}

export default Dashboard;
