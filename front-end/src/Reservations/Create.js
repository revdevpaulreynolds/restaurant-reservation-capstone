import React, { useState, useEffect } from "react";
import { useHistory, } from "react-router-dom"
import ReservationForm from "./Form";
import {createReservation} from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import {checkTuesday, isDatePast} from "../utils/date-time"


function ReservationCreate() {
    const [createError, setCreateError] = useState(null);
    const history = useHistory();

    // Versions of error handling that assume an array of errors
    // if (checkTuesday(checkDate)) {
    //     setCreateError((prevState) => ([
    //         ...prevState,
    //         {message: "We are closed Tuesdays"}
    //     ])
    //     )
    // }
    // if (isDatePast(checkDate)) {
    //     setCreateError((prevState) => ([
    //         ...prevState,
    //         {message: "Please select a date in the future"}
    //     ])
    //     )
    // }

    function submitHandler(reservation) {
        reservation.people = Number(reservation.people);
        let checkDate = `${reservation.reservation_date} ${reservation.reservation_time}`
        if (checkTuesday(checkDate)) {
            setCreateError((prevState) => ({
                ...prevState,
                message: "We are closed Tuesdays"
            })
            )
        }
        if (isDatePast(checkDate)) {
            setCreateError((prevState) => ({
                ...prevState,
                message: "Please select a date in the future"
            })
            )
        }
        // !createError && createReservation(reservation)
        //     .catch(setCreateError);
        // history.push(`/dashboard?date=${reservation.reservation_date}`)
    }

    const cancel = () => history.goBack();
    

    // const displayErrors = (<div className="alert alert-danger">{createError.map(error => <ErrorAlert error={error} />)}</div>)

    return (
        <div>
            <h1>Create a new reservation</h1>
            {/* {createError.length > 1 && displayErrors} */}
            <ErrorAlert error={createError} />
            <ReservationForm onCancel={cancel} submitHandler={submitHandler} />
        </div>
    )
    
}

export default ReservationCreate;