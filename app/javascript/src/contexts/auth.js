import React from "react";
import PropTypes from "prop-types";

import authReducer from "reducers/auth";

const AuthStateContext = React.createContext();
const AuthDispatchContext = React.createContext();

const token = localStorage.getItem("authToken");
const phoneNumber = localStorage.getItem("authPhone");
const userId = localStorage.getItem("authUserId");
const orgId = localStorage.getItem("authOrgId");
const subdomain = localStorage.getItem("authSubdomain");
const role = localStorage.getItem("authRole");

const initialState = {
  isLoggedIn: !!token,
  authToken: token ? token : null,
  authPhone: phoneNumber ? phoneNumber : null,
  authUserId: userId ? userId : null,
  authOrgId: orgId ? orgId : null,
  authSubdomain: subdomain ? subdomain : null,
  authRole: role ? role : null,
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(authReducer, initialState);
  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

const useAuthState = () => {
  const context = React.useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }
  return context;
};

const useAuthDispatch = () => {
  const context = React.useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error("useAuthDispatch must be used within a AuthProvider");
  }
  return context;
};

const useAuth = () => {
  return [useAuthState(), useAuthDispatch()];
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export { AuthProvider, useAuthState, useAuthDispatch, useAuth };
