import React from "react";
import { Home } from "../screen";
import { UpcomingClass } from "../screen";
import NewBooking from "../screen/NewBooking/NewBooking";

import { BrowserRouter as Switch, Route } from "react-router-dom";

export default () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/upcomingclass/:user" component={UpcomingClass} />
      <Route exact path="/upcomingclass/" component={UpcomingClass} />
      <Route exact path="/newbooking/:user" component={NewBooking} />
      <Route exact path="/newbooking/" component={NewBooking} />
    </Switch>
  );
};
