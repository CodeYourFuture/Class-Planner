import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  return (
    <div className="Home_Header_Main">
     <Link className="Home_Link Home_Header_Logo" to="/">
            <div>
              <p> &lt;</p>
              <p>CODE</p>
              <p>&gt;&nbsp;</p>
              <br />
              <p>YOUR</p>
            </div>
            <p>FUTURE</p>
        </Link>
      <div className="Home_Header_User_Div">
        <NavLink className="Home_Link" to="/coursecalendar/admin">
          <p>Admin</p>
        </NavLink>
        <NavLink className="Home_Link" to="/coursecalendar/volunteer">
          <p>Volunteer</p>
        </NavLink>
        <NavLink className="Home_Link" to="/coursecalendar/student">
          <p>Student</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
