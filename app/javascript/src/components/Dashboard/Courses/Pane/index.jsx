import React from "react";
import { Pane } from "nitroui";
import CourseForm from "../CourseForm";

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
    <Pane title="Edit Course" isOpen={showPane} onClose={onClose}>
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
