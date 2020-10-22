import React from "react";
import { Switch, Route } from "react-router-dom";

import Dashboard from "../Dashboard";
const PrivateRoutes = () => {
  return (
    <Switch>
      <Route path="/">
        <Dashboard />
      </Route>
    </Switch>
  );
};
export default PrivateRoutes;
