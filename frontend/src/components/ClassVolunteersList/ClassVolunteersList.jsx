import React, { useState } from "react";

import CancelBookingAlert from "./CancelBookingAlert.jsx";
import { connect } from "react-redux";
import "./ClassVolunteersList.scss";

const mapStateToProps = (state) => {
  return {
    pageData: state.PageReducer.pageData,
  };
};

const ClassVolunteersList = ({ pageData, bookings }) => {
  const [ConfirmationStatus, setConfirmationStatus] = useState(false);
  const [fullName, setFullName] = useState(false);

  function cancelBookingHandler(fullName, index) {
    if (pageData && pageData.user === "admin") setConfirmationStatus(true);
    if (pageData && pageData.user === "volunteer") setConfirmationStatus(true);
    setFullName(fullName);
  }

  function closeAlert() {
    setConfirmationStatus(false);
  }

  return (
    <div className="classvolunteerslist-container">
      {ConfirmationStatus && (
        <CancelBookingAlert
          user={pageData && pageData.user}
          fullName={fullName}
          closeHandler={closeAlert}
        />
      )}
      <p className="volunteerslist-title">Volunteers list</p>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">FullName</th>
            <th scope="col">Role</th>

            {pageData && pageData.user === "admin" && (
              <th scope="col">Email</th>
            )}

            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {bookings &&
            bookings.map((volunteer, index) => (
              <tr key={index}>
                <td>{volunteer.fullName}</td>
                <td>{volunteer.roleName}</td>
                {pageData.user === "admin" && <td>{volunteer.email}</td>}

                <td>
                  <button
                    className="btn-cancel-volunteer"
                    onClick={() => {
                      cancelBookingHandler(volunteer.fullName, volunteer._id);
                    }}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default connect(mapStateToProps)(ClassVolunteersList);
