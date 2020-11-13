import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Course from "../Dashboard/Courses/Course";
import Courses from "../Dashboard/Courses";
import Profile from "../Dashboard/Users/Profile";
import CourseTemplate from "../Dashboard/Template";
import ViewCourse from "../Dashboard/Template/ViewCourse";

const DashboardRoutes = () => {
  return (
    <Switch>
      <Route
        exact
        path="/courses/:course_id/chapters/:chapter_id/lessons/:lesson_id"
        component={ViewCourse}
      />

      <Route
        exact
        path="/courses/:course_id/preview"
        component={CourseTemplate}
      />
      <Route exact path="/courses/:course_id" component={Course} />
      <Route path="/courses" component={Courses} />
      <Route path="/profile" component={Profile} />
      <Redirect from="/" to="/courses" />
    </Switch>
  );
};
export default DashboardRoutes;
