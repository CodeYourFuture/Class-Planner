import React from "react";
import { connect } from "react-redux";
import "./ClassVolunteersList.scss";

const mapStateToProps = (state) => {
  return {
    pageData: state.PageReducer.pageData,
  };
};

const ClassVolunteersList = ({ pageData, bookings }) => {
  return (
    <div className="classvolunteerslist-container">
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
                  <button className="btn-cancel-volunteer">Cancel</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default connect(mapStateToProps)(ClassVolunteersList);
