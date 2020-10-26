import React from "react";
import { Pane } from "nitroui";
import CourseForm from "../CourseForm";

export default function AddCoursePane(props) {
  const onClose = () => props.setShowPane(false);
  return (
    <Pane title="Create a new course" isOpen={props.showPane} onClose={onClose}>
      <div className="px-6">
        <CourseForm
          onClose={onClose}
          fetchCourses={props.fetchCourses}
          isCreateForm={true}
        />
      </div>
    </Pane>
  );
}
