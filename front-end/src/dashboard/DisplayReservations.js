import { formatAsTime } from "../utils/date-time";
import { Link } from "react-router-dom";
import CancelButton from "../Reservations/CancelButton";

function DisplayReservations({ reservations, isToday }) {
  
  function addDashes(phoneNumber) {
    phoneNumber = phoneNumber.replace(/[^0-9.]/g, "");
    const dashedPhoneNumber =
    phoneNumber.slice(0, 3) +
    "-" +
    phoneNumber.slice(3, 6) +
    "-" +
    phoneNumber.slice(6);
    return dashedPhoneNumber;
  }
  
  let tableData;
  if (reservations) {
    tableData = reservations.map((result) => {
        let badge;
        switch (result.status) {
            case "seated":
                badge = "badge badge-primary";
                break;
            case "finished":
                badge = "badge badge-secondary";
                break;
            case "cancelled":
                badge = "badge badge-danger";
                break;
            default:
                badge = "badge badge-success";
        }

      return (
        <tr key={result.reservation_id}>
          <td>{result.reservation_id}</td>
          <td>{result.first_name}</td>
          <td>{result.last_name}</td>
          <td>{addDashes(result.mobile_number)}</td>
          <td>{formatAsTime(result.reservation_time)}</td>
          <td data-reservation-id-status={result.reservation_id}>
            <h6 className={badge}>{result.status}</h6>
          </td>
          <td>{result.people}</td>
          <td>
            {result.status === "booked" && isToday ? (
              <a
                className="btn btn-primary"
                href={`/reservations/${result.reservation_id}/seat`}
              >
                Seat
              </a>
            ) : null}
          </td>
          <td data-reservation-id-status={result.reservation_id}>
            {result.status === "booked" ? (
              <Link
                to={{
                  pathname: `/reservations/${result.reservation_id}/edit`,
                }}
              >
                <button className="btn btn-secondary">Edit</button>
              </Link>
            ) : null}
          </td>
          <td>
            <CancelButton reservation_id={result.reservation_id} />
          </td>
        </tr>
      );
    });
  }

  return reservations.length > 0 ? (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Mobile number</th>
          <th scope="col">Reservation time</th>
          <th scope="col">Status</th>
          <th scope="col">Party size</th>
          <th scope="col">Seat party</th>
          <th scope="col">Edit</th>
          <th scope="col">Cancel</th>
        </tr>
      </thead>
      <tbody>{tableData}</tbody>
    </table>
  ) : null;
}

export default DisplayReservations;
