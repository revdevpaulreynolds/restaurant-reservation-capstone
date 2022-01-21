import { useHistory } from "react-router-dom";
import { updateStatus } from "../utils/api";

function CancelButton({ reservation_id }) {
  const reservation = reservation_id;
  const history = useHistory();

  async function handleClick(reservation) {
    console.log(reservation);
    if (
      window.confirm(
        "Do you want to cancel this reservation? This cannot be undone."
      )
    ) {
      await updateStatus(reservation_id, "cancelled");
      history.go(0);
    }
  }

  return (
    <button
      data-reservation-id-cancel={reservation}
      className="btn btn-danger"
      onClick={() => handleClick(reservation)}
    >
      Cancel
    </button>
  );
}

export default CancelButton;
