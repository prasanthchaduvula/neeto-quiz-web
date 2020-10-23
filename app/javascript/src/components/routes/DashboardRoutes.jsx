import React from "react";
import { Switch, Route } from "react-router-dom";
<<<<<<< HEAD
import Course from "../Dashboard/Courses/Course";
import Courses from "../Dashboard/Courses";
=======
import Course from "../Dashboard/Courses";
import ShowComponent from "../Dashboard/Courses/Chapters/ShowChapter";
// import IndivitualCourse from "../Dashboard/Courses/IndivitualCourse";
import IndivitualCourse1 from "../Dashboard/Courses/IndivitualCourse1";
>>>>>>> changed ui as per requirement

const DashboardRoutes = () => {
  return (
    <Switch>
<<<<<<< HEAD
      <Route exact path="/courses/:course_id" component={Course} />
      <Route path="/courses" component={Courses} />
=======
      <Route
        exact
        path="/courses/:course_id/chapters/:chapter_id"
        component={ShowComponent}
      />
      <Route exact path="/courses/:course_id" component={IndivitualCourse1} />
      <Route path="/courses" component={Course} />
>>>>>>> changed ui as per requirement
    </Switch>
  );
};
export default DashboardRoutes;
