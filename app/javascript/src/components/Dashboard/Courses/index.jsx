import React, { useState, useEffect } from "react";
import { PageHeading } from "nitroui/layouts";
import { Button } from "nitroui";
import NewCoursePane from "./NewCoursePane";
import ListCourses from "./ListCourses";
import CourseApi from "../../../apis/courses";
import EditCoursePane from "./EditCoursePane";

export default function Course() {
  const [showNewCoursePane, setShowNewCoursePane] = useState(false);
  const [showEditCoursePane, setShowEditCoursePane] = useState(false);
  const [courses, setCourses] = useState([]);
  const [courseEditId, setCourseEditId] = useState("");

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
        <ListCourses
          setShowEditPane={setShowEditCoursePane}
          courses={courses}
          setCourseId={setCourseEditId}
        />
      ) : null}
      <NewCoursePane
        showPane={showNewCoursePane}
        setShowPane={setShowNewCoursePane}
        fetchCourses={fetchCourses}
      />
      <EditCoursePane
        showPane={showEditCoursePane}
        setShowPane={setShowEditCoursePane}
        fetchCourses={fetchCourses}
        courseId={courseEditId}
      />
    </div>
  );
}
