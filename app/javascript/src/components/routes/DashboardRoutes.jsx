import React from "react";
import { Switch, Route } from "react-router-dom";
import Course from "../Dashboard/Courses";
import IndivitualCourse from "../Dashboard/Courses/IndivitualCourse";

const DashboardRoutes = () => {
  return (
    <Switch>
      <Route exact path="/courses/:course_id" component={IndivitualCourse} />
      <Route path="/courses" component={Course} />
    </Switch>
  );
};
export default DashboardRoutes;
