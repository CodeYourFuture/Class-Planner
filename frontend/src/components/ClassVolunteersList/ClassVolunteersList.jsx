import React from "react";
import "./ClassVolunteersList.scss";

const ClassVolunteersList = ({ bookings }) => {
  return (
    <div className="classvolunteerslist-container">
      <p className="volunteerslist-title">Volunteers list</p>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">FullName</th>
            <th scope="col">Role</th>
            <th scope="col">Email</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((volunteer) => (
            <tr key={volunteer.fullName}>
              <td>{volunteer.fullName}</td>
              {/* {param.user === "admin" && <td>{volunteer.roleName}</td>} */}
              <td>{volunteer.email}</td>
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

export default ClassVolunteersList;
