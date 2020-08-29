import React from "react";
import Routes from "./routes/"
import { BrowserRouter as Router } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes />
      </div>
    </Router>
  );
};

export default App;
