import React, { useState, useEffect } from "react";
import { PageHeading } from "nitroui/layouts";
import { Button, PageLoader } from "nitroui";
import { getCourses } from "apis/courses";
import ListCourses from "./ListCourses";
import CoursePane from "./Pane";

export default function Courses() {
  const [coursePane, setCoursePane] = useState(false);
  const [courses, setCourses] = useState({});

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
      {courses ? (
        <ListCourses
          courses={courses.courses_created}
          joinedCourses={courses.courses_joined}
        />
      ) : (
        <PageLoader />
      )}
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
