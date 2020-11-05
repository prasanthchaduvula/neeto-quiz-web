import React from "react";
import { Pane } from "nitroui";
import CourseForm from "./Form";

export default function CoursePane({
  setShowPane,
  showPane,
  isCreateForm,
  course,
  fetchCourses,
  setCourse,
}) {
  const onClose = () => setShowPane(false);

  return (
    <Pane
      title={isCreateForm ? "Add Course" : "Edit Course"}
      isOpen={showPane}
      onClose={onClose}
    >
      <div className="px-6">
        <CourseForm
          onClose={onClose}
          isCreateForm={isCreateForm}
          course={course}
          fetchCourses={fetchCourses}
          setCourse={setCourse}
        />
      </div>
    </Pane>
  );
}