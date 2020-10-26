import React, { useState, useEffect } from "react";
import { PageHeading } from "nitroui/layouts";
import { Button, PageLoader } from "nitroui";
import AddCoursePane from "./Pane/Add";
import ListCourses from "./ListCourses";
import { getCourses } from "apis/courses";

export default function Courses() {
  const [addCoursePane, setAddCoursePane] = useState(false);
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
            onClick={() => setAddCoursePane(true)}
            label="Add new course"
            icon="ri-add-line"
          />
        )}
      />
      {courses ? <ListCourses courses={courses} /> : <PageLoader />}
      <AddCoursePane
        showPane={addCoursePane}
        setShowPane={setAddCoursePane}
        fetchCourses={fetchCourses}
      />
    </div>
  );
}
