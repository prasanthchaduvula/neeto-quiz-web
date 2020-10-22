import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Signup from "../Authentication/Signup";
import PageNotFound from "../shared/PageNotFound";

const PublicRoutes = () => {
  return (
    <Switch>
      <Route exact path="/signup">
        <Signup />
      </Route>
      <Route exact path="/">
        <Redirect to="/signup" />
      </Route>
      <Route path="*">
        <PageNotFound />
      </Route>
    </Switch>
  );
};

export default PublicRoutes;
