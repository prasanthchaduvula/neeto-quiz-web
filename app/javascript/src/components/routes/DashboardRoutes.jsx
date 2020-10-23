import React from "react";
import { Switch, Route } from "react-router-dom";
import Course from "../Dashboard/Courses/Course";
import Courses from "../Dashboard/Courses/Courses";

const DashboardRoutes = () => {
  return (
    <Switch>
      <Route exact path="/courses/:course_id" component={Course} />
      <Route path="/courses" component={Courses} />
    </Switch>
  );
};
export default DashboardRoutes;
