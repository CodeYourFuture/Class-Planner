import React, { useState } from "react";
import axios from "axios";
import users from "../../data/users.json";
import "./CancelBookingAlert.scss";

const CancelBookingAlert = ({
  user,
  city,
  id,
  fullName,
  WeekNumber,
  email,
  _id,
  closeHandler,
  showAlert,
}) => {
  const [volunteerEmail, setVolunteerEmail] = useState("");

  function validateVolunteerEmail(bookingEmail) {
    if (bookingEmail === volunteerEmail && volunteerEmail !== "") {
      deleteBooking();
    } else {
      closeHandler();
      showAlert("danger", "Oh sorry!  The email address is incorrect .");
    }
  }

  function deleteBooking() {
    axios
      .delete(`/api/v1/bookings/${_id}`)
      .then(function (response) {
        if (response.data.success === true) {
          closeHandler();
          showAlert("success", "The booking has been deleted successfully.");
          setTimeout(() => {
            window.location.replace(
              `/${user}/${city}/attendedvolunteers/${id}/${WeekNumber}/`
            );
          }, 1000);
        }
      })
      .catch(function (err) {
        closeHandler();
        if (err.response.data.success === false) {
          showAlert("danger", err.response.data.error);
        }
      });
  }
  return (
    <React.Fragment>
      {user === users[0].id && (
        <div className="cancelbooking-alert">
          <p>
            Are you sure to cancel the corresponding booking for {fullName} ?
          </p>
          <div>
            <button
              className="cancelbooking-no"
              onClick={() => closeHandler(true)}
            >
              NO
            </button>
            <button
              className="cancelbooking-yes"
              onClick={() => deleteBooking()}
            >
              YES
            </button>
          </div>
        </div>
      )}

      {user === users[1].id && (
        <div className="cancelbooking-alert">
          <p>
            Please confirm {fullName} email address to cancel the corresponding
            booking for the current class.
          </p>

          <form
            onSubmit={() => {
              validateVolunteerEmail(email);
            }}
          >
            <div>
              <input
                id="email"
                type="email"
                name="email"
                className="form-control volunteeremail-confirm"
                onChange={(e) => setVolunteerEmail(e.target.value)}
              />
              <button type="submit" className="cancelbooking-confirm">
                Confirm
              </button>
            </div>
          </form>
        </div>
      )}
    </React.Fragment>
  );
};

export default CancelBookingAlert;
