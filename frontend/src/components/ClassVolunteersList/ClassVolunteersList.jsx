import React from "react";
import "./ClassVolunteersList.scss";

const ClassVolunteersList = ({ bookings }) => {
  return (
    <div className="classvolunteerslist-container">
      <h1>{bookings[0].fullName}</h1>
    </div>
  );
};

export default ClassVolunteersList;
