import React, { useState } from "react";
import "./Loading.scss";

const Loading = () => {
  const [message, setMessage] = useState(false);
  setTimeout(() => {
    setMessage(true);
  }, 1500);
  return (
    <div className="loaading-container">
      {message ? (
        <p className="nothing">Nothing to show!</p>
      ) : (
        <p className="loading">Loading . . .</p>
      )}
    </div>
  );
};

export default Loading;
