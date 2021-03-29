import React from "react";
import { Switch, Route } from "react-router-dom";
import LandingPage from "../LandingPage/LandingPage";

const DashboardRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />
    </Switch>
  );
};
export default DashboardRoutes;
