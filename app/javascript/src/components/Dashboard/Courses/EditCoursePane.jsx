import React, { useState } from "react";
import { Pane } from "nitroui";
import CourseForm from "./CourseForm";

export default function EditCoursePane(props) {
  const [courseName] = useState(props.course.name);
  const [courseDescription] = useState(props.course.description);

  const onClose = () => props.setShowPane(false);

  return (
    <Pane title="Edit Course" isOpen={props.showPane} onClose={onClose}>
      <div className="p-6">
        <CourseForm
          onClose={onClose}
          courseName={courseName}
          courseDescription={courseDescription}
          courseId={props.courseId}
          isCreateForm={false}
          setCourse={props.setCourse}
        />
      </div>
    </Pane>
  );
}
