import React, { useState } from "react";
import { Pane } from "nitroui";
import CourseForm from "./CourseForm";

export default function EditCoursePane(props) {
  const [courseName] = useState(props.courseDetails.course.name);
  const [courseDescription] = useState(props.courseDetails.course.description);

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
