import React from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "components/Common/Navbar";
import Course from "./Courses";

const Home = () => {
  return (
    <div className="flex h-screen">
      <Navbar />
      <div className="content-main">
        <Switch>
          <Route path="/courses" component={Course} />
        </Switch>
      </div>
    </div>
  );
};

export default Home;
