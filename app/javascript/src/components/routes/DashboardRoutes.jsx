import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useAuthState } from "contexts/auth";
import PageNotFound from "shared/PageNotFound";
import Course from "components/Dashboard/Courses/Course";
import Courses from "components/Dashboard/Courses";
import CourseTemplate from "components/Dashboard/Courses/Course/Template";
import ViewCourse from "components/Dashboard/Courses/Course/Template/ViewCourse";
import Instructor from "components/Dashboard/Instructor";
import Mocktests from "components/Dashboard/Mocktests";
import Mocktest from "components/Dashboard/Mocktests/Mocktest";
import Attempt from "components/Dashboard/Mocktests/Mocktest/Template/Attempt";
import Attempts from "components/Dashboard/Mocktests/Mocktest/Template/Attempts";
import Result from "components/Dashboard/Mocktests/Mocktest/Template/Result";
import Explore from "../Dashboard/Explore";
import Instructors from "../Dashboard/Instructors";
import Students from "../Dashboard/Students";
import Settings from "../Dashboard/Settings";
import Account from "../Dashboard/Account";

const DashboardRoutes = () => {
  const authState = useAuthState();

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
      <Route
        exact
        path="/mocktests/:mocktest_id/attempts"
        component={Attempts}
      />
      <Route
        exact
        path="/mocktests/:mocktest_id/attempts/:id"
        component={Attempt}
      />
      <Route
        exact
        path="/mocktests/:mocktest_id/attempts/:id/result"
        component={Result}
      />
      <Route exact path="/mocktests" component={Mocktests} />
      <Route path="/account" component={Account} />
      <Route exact path="/explore" component={Explore} />
      <Route
        exact
        path="/instructors"
        component={authState.authRole == "admin" ? Instructors : PageNotFound}
      />
      <Route
        exact
        path="/students"
        component={authState.authRole == "admin" ? Students : PageNotFound}
      />
      <Route
        exact
        path="/settings"
        component={authState.authRole == "admin" ? Settings : PageNotFound}
      />
      <Redirect to="/explore" path="/" />
    </Switch>
  );
};
export default DashboardRoutes;
