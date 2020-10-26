import React from "react";
import { Pane } from "nitroui";
import CourseForm from "../CourseForm";

export default function EditCoursePane(props) {
  const onClose = () => props.setShowPane(false);

  return (
    <Pane title="Edit Course" isOpen={props.showPane} onClose={onClose}>
      <div className="p-6">
        <CourseForm
          onClose={onClose}
          course={props.course}
          isCreateForm={false}
          setCourse={props.setCourse}
        />
      </div>
    </Pane>
  );
}
