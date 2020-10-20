import React from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "components/Common/Navbar";
import Course from "./Courses";

const Home = () => {
  return (
    <div className="flex h-screen">
      <Navbar />
      <div>Dashboard</div>
      <Switch>
        <Route path="/courses" component={Course} />
      </Switch>
    </div>
  );
};

export default Home;
