import React, { useState, useEffect } from "react";
import { PageHeading } from "nitroui/layouts";
import { Button, PageLoader } from "nitroui";
import { getCourses } from "apis/courses";
import ListCourses from "./ListCourses";
<<<<<<< HEAD:app/javascript/src/components/Dashboard/Courses/index.jsx
import CoursePane from "./Pane";

export default function Courses() {
  const [coursePane, setCoursePane] = useState(false);
=======
import CourseApi from "../../../apis/courses";
export default function Courses() {
  const [showNewCoursePane, setShowNewCoursePane] = useState(false);
>>>>>>> Added chapters table:app/javascript/src/components/Dashboard/Courses/Courses.jsx
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = () => {
    getCourses().then(response => setCourses(response.data));
  };

  return (
    <div>
      <PageHeading
        title="Courses"
        rightButton={() => (
          <Button
            onClick={() => setCoursePane(true)}
            label="Add new course"
            icon="ri-add-line"
          />
        )}
      />
      {courses ? <ListCourses courses={courses} /> : <PageLoader />}
      <CoursePane
        showPane={coursePane}
        setShowPane={setCoursePane}
        isCreateForm={true}
        course=""
        fetchCourses={fetchCourses}
        setCourse={""}
      />
    </div>
  );
}
