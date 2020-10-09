import React from "react";
import Overview from "../../components/Overview/Overview.jsx";
import "./Overview.scss"

const OverviewPage = () => {
  return (
    <div className="coursecalendar-container">
      <Overview
        user={"4ujktF3cwUWMFITqex-IiA"}
        city={"London"}
        component={"overview"}
      />
    </div>
  );
};

export default OverviewPage;
