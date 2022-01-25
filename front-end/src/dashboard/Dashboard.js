import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import {
  formatAsDate,
  previous,
  next,
  today,
} from "../utils/date-time";
import useQuery from "../utils/useQuery";
import DisplayReservations from "./DisplayReservations";
import TableList from "./TableList";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  let isToday = true; // Sometime in the future I want the seat button
  // to only display if the date is today
  const query = useQuery();
  const getDate = query.get("date");

  if (getDate && getDate !== today()) {
    date = getDate;
    isToday = false;
  }

  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadDashboard, [date]);

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
          disabled={date === today()}
        >
          Today
        </button>
        <button className="btn btn-primary" onClick={() => pushDate(nextDate)}>
          Forward
        </button>
      </div>
      <DisplayReservations reservations={result} isToday={isToday}/>
      {!reservations.length && <h3>No reservations on this date</h3>}
      <TableList />
    </main>
  );
}

export default Dashboard;
