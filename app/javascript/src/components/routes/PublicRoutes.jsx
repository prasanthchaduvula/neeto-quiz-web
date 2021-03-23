import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
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
        <Redirect to="/signin" path="/" />
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
        <Redirect to="/signup" path="/" />
      </Switch>
    );
  }
};

export default PublicRoutes;
