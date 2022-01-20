import { useState } from "react";
import { search } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import DisplaySearch from "./DisplaySearch";

function Search() {
  const [searchNumber, setSearchNumber] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [notFoundError, setNotFoundError] = useState(null);

  function changeHandler({ target: { value } }) {
    setSearchNumber(value);
  }

  async function submitHandler(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    setNotFoundError(null);
    const results = await search(searchNumber);
    if (!results.length) setNotFoundError({ message: "No reservations found" });
    setSearchResults(results);
  }

  return (
    <div>
      <h1>Search here</h1>
      <div className="row">
        <form onSubmit={submitHandler} className="col-4">
          <label htmlFor="mobile_number">Mobile number</label>
          <input
            name="mobile_number"
            type="text"
            id="mobile_number"
            className="form-control"
            value={searchNumber}
            required
            placeholder="Enter a phone number"
            onChange={changeHandler}
          />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
      <ErrorAlert error={notFoundError} />
      <DisplaySearch searchResults={searchResults}/>
    </div>
  );
}

export default Search;
