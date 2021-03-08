import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";
import { initializeLogger } from "common/logger";
import { registerResponseIntercept } from "apis/axios";
import { useAuthDispatch, useAuthState } from "contexts/auth";
import { useUserDispatch } from "contexts/user";
import { registerRequestIntercept } from "../apis/axios";
import PublicRoutes from "./routes/PublicRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";

registerRequestIntercept();

const App = props => {
  const userDispatch = useUserDispatch();
  const authDispatch = useAuthDispatch();
  const authState = useAuthState();

  useEffect(() => {
    userDispatch({ type: "SET_USER", payload: { user: props.user } });
    registerResponseIntercept(authDispatch);
    initializeLogger();
  }, []);

  const publicRoutes = () => {
    return <PublicRoutes />;
  };

  const privateRoutes = () => {
    return <PrivateRoutes />;
  };
  return (
    <BrowserRouter>
      <ToastContainer />
      {authState.authUserId && authState.authToken
        ? privateRoutes()
        : publicRoutes()}
    </BrowserRouter>
  );
};

App.propTypes = {
  user: PropTypes.object,
};

export default App;
