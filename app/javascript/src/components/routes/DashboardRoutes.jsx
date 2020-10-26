import React from "react";
import { Switch, Route } from "react-router-dom";
import Course from "../Dashboard/Courses/Course";
import Courses from "../Dashboard/Courses";
import TableOfContents from "../Dashboard/PreviewCourse/TableOfContents";
import ViewCourse from "../Dashboard/PreviewCourse/ViewCourse";

const DashboardRoutes = () => {
  return (
    <Switch>
      <Route
        exact
        path="/courses/:course_id/preview/lessons/lesson_id"
        component={ViewCourse}
      />
      <Route
        exact
        path="/courses/:course_id/preview"
        component={TableOfContents}
      />
      <Route exact path="/courses/:course_id" component={Course} />
      <Route path="/courses" component={Courses} />
    </Switch>
  );
};
export default DashboardRoutes;
