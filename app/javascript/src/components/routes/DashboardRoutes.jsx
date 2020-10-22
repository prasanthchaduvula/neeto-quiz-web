import React from "react";
import { Switch, Route } from "react-router-dom";
import Course from "../Dashboard/Courses";
import IndivitualCourse from "../Dashboard/Courses/IndivitualCourse";

const DashboardRoutes = () => {
  return (
    <Switch>
      <Route path="/courses" component={Course} />
      <Route path="/courses/:course_id" component={IndivitualCourse} />
    </Switch>
  );
};
export default DashboardRoutes;
