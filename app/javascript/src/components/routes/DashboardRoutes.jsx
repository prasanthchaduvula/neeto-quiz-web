import React from "react";
import { Switch, Route } from "react-router-dom";
import Course from "../Dashboard/Courses/Course";
import Courses from "../Dashboard/Courses";
import Profile from "../Dashboard/Users/Profile";
import CourseTemplate from "../Dashboard/Template";
import ViewCourse from "../Dashboard/Template/ViewCourse";
import ExploreCourses from "../Dashboard/Courses/Explore";
import Instructor from "../Dashboard/Instructor";
import Mocktests from "../Dashboard/Mocktests";
import Mocktest from "../Dashboard/Mocktests/Mocktest";

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
      <Route exact path="/instructors/:id" component={Instructor} />
      <Route exact path="/mocktests/:id" component={Mocktest} />
      <Route exact path="/mocktests" component={Mocktests} />
      <Route path="/profile" component={Profile} />
      <Route path="/" component={ExploreCourses} />
    </Switch>
  );
};
export default DashboardRoutes;
