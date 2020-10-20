import React from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "components/Common/Navbar";
import Course from "./Courses";
import IndivitualCourse from "./Courses/IndivitualCourse";

const Home = () => {
  return (
    <div className="flex h-screen">
      <Navbar />
      <div className="content-main">
        <Switch>
          <Route path="/courses" component={Course} />
          <Route path="/courses/:course_id" component={IndivitualCourse} />
        </Switch>
      </div>
    </div>
  );
};

export default Home;
