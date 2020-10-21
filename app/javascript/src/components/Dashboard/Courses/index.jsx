import React, { useState, useEffect } from "react";
import { PageHeading } from "nitroui/layouts";
import { Button } from "nitroui";
import NewCoursePane from "./NewCoursePane";
import ListCourses from "./ListCourses";
import { courseFetch } from "../../../apis/courses";

export default function Course() {
  const [showNewCoursePane, setShowNewCoursePane] = useState(false);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = () => {
    courseFetch().then(response => setCourses(response.data));
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
      {courses ? <ListCourses courses={courses} /> : null}
      <NewCoursePane
        showPane={showNewCoursePane}
        setShowPane={setShowNewCoursePane}
        fetchCourses={fetchCourses}
      />
    </div>
  );
}
