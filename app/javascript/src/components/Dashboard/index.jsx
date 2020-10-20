import React from "react";
import { Route, Switch } from "react-router-dom";

import Navbar from "components/Common/Navbar";

import Profile from "./Users/Profile";

const Home = () => {
  return (
    <div className="flex h-screen">
      <Navbar />
      <Switch>
        <Route exact path="/my/profile" component={Profile} />
      </Switch>
    </div>
  );
};

export default Home;
