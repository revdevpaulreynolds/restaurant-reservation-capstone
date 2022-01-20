import ReservationForm from "./Form";
import ErrorAlert from "../layout/ErrorAlert";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import React, { useState } from "react";
import { formatAsDate } from "../utils/date-time";
import { getReservation } from "../utils/api";

function Edit() {
  const { reservation_id } = useParams();
  const [reservation, setReservation] = useState(null);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadReservation, [reservation_id]);

  function loadReservation() {
    const ac = new AbortController();
    setReservationsError(null);
    getReservation(reservation_id, ac.signal)
      .then(setReservation)
      .catch(setReservationsError);
    return () => ac.abort();
  }

  function submitHandler(updatedReservation) {
    updatedReservation.mobile_number = (updatedReservation.mobile_number).replace(/[^0-9.]/g, '')
    updatedReservation.people = Number(updatedReservation.people);
    console.log(updatedReservation);
  }


  if (reservation) {
      reservation.reservation_date = formatAsDate(reservation.reservation_date);
  }

  return (
    <div>
      <h1>Edit reservation</h1>
      <ErrorAlert error={reservationsError} />
      {reservation && <ReservationForm submitHandler={submitHandler} initialState={reservation} />}
    </div>
  );
}

export default Edit;
