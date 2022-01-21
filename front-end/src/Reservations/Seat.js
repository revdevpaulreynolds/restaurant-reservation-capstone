import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { listTables, seatReservation, getReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function Seat() {
  const [tables, setTables] = useState([]);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ table_id: null });
  const [reservation, setReservation] = useState(null);

  const { reservation_id } = useParams();

  function loadReservation() {
    const ac = new AbortController();
    getReservation(reservation_id).then(setReservation).catch(setError);
    return () => ac.abort();
  }

  useEffect(loadReservation, [reservation_id])

  const history = useHistory();

  function loadTables() {
    const ac = new AbortController();
    listTables(ac.signal).then(setTables).catch(setError);
    return () => ac.abort();
  }

  useEffect(loadTables, []);

  function handleChange({ target }) {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  }

  async function submitHandler(evt) {
    const ac = new AbortController();
    evt.preventDefault();
    evt.stopPropagation();
    await seatReservation(reservation_id, formData.table_id, ac.signal)
      .then(() => history.push("/dashboard"))
      .catch(setError);
  }

  let tableSelect = tables.map((table) => (
    <option key={table.table_id} value={table.table_id}>
      {table.table_name} - {table.capacity}
    </option>
  ));

  return (
    <div>
      <ErrorAlert error={error} />
        {reservation && <h3>Reservation {reservation.reservation_id} has {reservation.people} guest{reservation.people > 1 && 's'}.</h3>}
        <div >

      <form onSubmit={submitHandler}>
        <div className="form-group">
        <label htmlFor="table_id">
          Please select a table
          <select
            onChange={handleChange}
            className="form-control form-select form-select-lg"
            id="table_id"
            name="table_id"
            multiple
            size={tables.length + 1}
          >
            <option value="">--Select a table--</option>
            {tables.length && tableSelect}
          </select>
        </label>
        </div>
        <button className="btn btn-secondary" onClick={() => history.goBack()}>
          Cancel
        </button>
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={!formData.table_id}
        >
          Submit
        </button>
      </form>
        </div>
    </div>
  );
}

export default Seat;
