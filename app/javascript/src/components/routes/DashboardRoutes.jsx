import React from "react";
import { Switch, Route } from "react-router-dom";
import Course from "../Dashboard/Courses/Course";

const DashboardRoutes = () => {
  return (
    <Switch>
      <Route exact path="/courses/:course_id" component={Course} />
      <Route path="/courses" component={Course} />
    </Switch>
  );
};
export default DashboardRoutes;
