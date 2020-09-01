import React, { useState } from "react";
import "./CancelBookingAlert.scss";

const CancelBookingAlert = ({ user, fullName, closeHandler }) => {
  const [volunteerEmail, setVolunteerEmail] = useState("");

  function validateVolunteerEmail() {
    console.log(volunteerEmail);
  }

  return (
    <React.Fragment>
      {user === "admin" && (
        <div className="cancelbooking-alert">
          <p>
            Are you sure to cancel the corresponding booking for
            {fullName} ?
          </p>
          <div>
            <button
              className="cancelbooking-no"
              onClick={() => closeHandler(true)}
            >
              NO
            </button>
            <button className="cancelbooking-yes">YES</button>
          </div>
        </div>
      )}

      {user === "volunteer" && (
        <div className="cancelbooking-alert">
          <p>
            Please confirm {fullName} email address to cancel the corresponding
            booking for the current class.
          </p>
          <div>
            <div>
              <input
                id="email"
                type="email"
                name="email"
                className="form-control volunteeremail-confirm"
                onChange={(e) => setVolunteerEmail(e.target.value)}
              />
              <button
                className="cancelbooking-confirm"
                onClick={validateVolunteerEmail}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default CancelBookingAlert;
