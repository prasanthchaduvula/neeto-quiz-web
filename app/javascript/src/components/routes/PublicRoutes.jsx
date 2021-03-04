import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PageNotFound from "shared/PageNotFound";
import Signin from "../Authentication/Signin";
import Signup from "../Authentication/Signup";

const PublicRoutes = () => {
  if (window.location.host.split(".")[0] != "app") {
    return (
      <Switch>
        <Route exact path="/signin">
          <Signin />
        </Route>
        <Route exact path="/">
          <Redirect to="/signin" />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    );
  } else {
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
  }
};

export default PublicRoutes;
