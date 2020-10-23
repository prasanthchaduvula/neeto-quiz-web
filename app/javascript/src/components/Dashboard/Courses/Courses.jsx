import React, { useState, useEffect } from "react";
import { PageHeading } from "nitroui/layouts";
import { Button, PageLoader } from "nitroui";
import NewCoursePane from "./NewCoursePane";
import ListCourses from "./ListCourses";
import CourseApi from "../../../apis/courses";
export default function Courses() {
  const [showNewCoursePane, setShowNewCoursePane] = useState(false);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = () => {
    CourseApi.coursesFetch().then(response => setCourses(response.data));
  };

  return (
    <div>
      <PageHeading
        title="Courses"
        rightButton={() => (
          <Button
            onClick={() => setShowNewCoursePane(true)}
            label="Add new course"
            icon="ri-add-line"
          />
        )}
      />
      {courses ? (
        <ListCourses courses={courses} refetch={fetchCourses} />
      ) : (
        <PageLoader />
      )}
      <NewCoursePane
        showPane={showNewCoursePane}
        setShowPane={setShowNewCoursePane}
        fetchCourses={fetchCourses}
      />
    </div>
  );
}
