import React from "react";
import { Pane } from "nitroui";
import CourseForm from "../CourseForm";

export default function EditCoursePane({
  setShowPane,
  showPane,
  course,
  setCourse,
}) {
  const onClose = () => setShowPane(false);

  return (
    <Pane title="Edit Course" isOpen={showPane} onClose={onClose}>
      <div className="px-6">
        <CourseForm
          onClose={onClose}
          isCreateForm={false}
          course={course}
          setCourse={setCourse}
        />
      </div>
    </Pane>
  );
}
