import React, { useEffect } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";
import { initializeLogger } from "common/logger";
import { registerIntercepts } from "apis/axios";
import Dashboard from "components/Dashboard";
import PrivateRoute from "components/Common/PrivateRoute";
import Signup from "components/Authentication/Signup";
import { useAuthState, useAuthDispatch } from "contexts/auth";
import { useUserDispatch } from "contexts/user";

const App = props => {
  const { authToken } = useAuthState();
  const userDispatch = useUserDispatch();
  const authDispatch = useAuthDispatch();

  useEffect(() => {
    userDispatch({ type: "SET_USER", payload: { user: props.user } });
    initializeLogger();
    registerIntercepts(authDispatch);
  }, []);
  return (
    <BrowserRouter>
      <ToastContainer />
      <Switch>
        <Route exact path="/signup" component={Signup} />
        <PrivateRoute
          path="/"
          redirectRoute="/signup"
          condition={!!authToken}
          component={Dashboard}
        />
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  user: PropTypes.object,
};

export default App;
