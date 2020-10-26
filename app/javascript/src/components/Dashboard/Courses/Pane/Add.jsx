import React from "react";
import { Pane } from "nitroui";
import CourseForm from "../CourseForm";

export default function AddCoursePane({ setShowPane, showPane, fetchCourses }) {
  const onClose = () => setShowPane(false);
  return (
    <Pane title="Create a new course" isOpen={showPane} onClose={onClose}>
      <div className="px-6">
        <CourseForm
          onClose={onClose}
          isCreateForm={true}
          fetchCourses={fetchCourses}
        />
      </div>
    </Pane>
  );
}
