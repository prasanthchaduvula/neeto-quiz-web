import React from "react";
import { Pane } from "nitroui";
import CourseForm from "./CourseForm";

export default function EditCoursePane(props) {
  // const [courseName] = useState(props.course.name);
  // const [courseDescription] = useState(props.course.description);
  // const [coursePrice] = useState(props.course.price);

  const onClose = () => props.setShowPane(false);

  return (
    <Pane title="Edit Course" isOpen={props.showPane} onClose={onClose}>
      <div className="p-6">
        <CourseForm
          onClose={onClose}
          courseName={props.course.name}
          courseDescription={props.course.description}
          coursePrice={props.course.price}
          courseId={props.courseId}
          isCreateForm={false}
          setCourse={props.setCourse}
        />
      </div>
    </Pane>
  );
}
