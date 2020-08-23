import React from "react";
import Home from "../screen/Home/Home.jsx";
import UpcomingClass from "../screen/UpcomingClass/UpcomingClass.jsx";
import NewClass from "../screen/NewClass/NewClass.jsx";
import NewBooking from "../screen/NewBooking/NewBooking.jsx";

import { BrowserRouter as Switch, Route } from "react-router-dom";

export default () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/upcomingclass/:user" component={UpcomingClass} />
      <Route exact path="/newclass/:user" component={NewClass} />
      <Route exact path="/newbooking/:user" component={NewBooking} />
    </Switch>
  );
};
