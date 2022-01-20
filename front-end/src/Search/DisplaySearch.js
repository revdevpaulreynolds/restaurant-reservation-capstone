import { formatAsTime } from "../utils/date-time";
import {Link} from "react-router-dom";

function DisplaySearch({ searchResults }) {
  let tableData;

  if (searchResults) {
    tableData = searchResults.map((result) => {
      return (
        <tr key={result.reservation_id}>
          <td>{result.reservation_id}</td>
          <td>{result.first_name}</td>
          <td>{result.last_name}</td>
          <td>{result.mobile_number}</td>
          <td>{formatAsTime(result.reservation_time)}</td>
          <td>{result.people}</td>
          <td>{result.status}</td>
          <td> {result.status === "booked" ? (
                <Link to={{
                    pathname: `/reservations/${result.reservation_id}/edit`,
                    state: result
                }}><button className="btn btn-secondary">Edit</button></Link>

            ) : null }</td>
        </tr>
      );
    });
  }

  return searchResults.length > 0 ? (
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
          <th scope="col">Edit</th>
        </tr>
      </thead>
      <tbody>{tableData}</tbody>
    </table>
  ) : null;
}

export default DisplaySearch;
