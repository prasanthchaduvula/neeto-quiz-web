import React, { useEffect, useState } from "react";
import { Pane, PageLoader } from "nitroui";
import EditCourseForm from "./EditCourseForm";
import Axios from "axios";
import { showToastr } from "../../../common/index";

export default function EditCoursePane(props) {
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (props.courseId) {
      fetchCourse();
    }
  }, [props.courseId]);

  const fetchCourse = () => {
    Axios(`/api/v1/courses/${props.courseId}`)
      .then(response => {
        setCourseName(response.data.course.name);
        setCourseDescription(response.data.course.description);
        setIsLoading(false);
      })
      .catch(error => showToastr("error", error));
  };
  const onClose = () => props.setShowPane(false);

  return (
    <Pane title="Edit Course" isOpen={props.showPane} onClose={onClose}>
      <div className="p-6">
        {isLoading ? (
          <PageLoader />
        ) : (
          <EditCourseForm
            onClose={onClose}
            courseName={courseName}
            courseDescription={courseDescription}
            courseId={props.courseId}
            refetch={props.fetchCourses}
          />
        )}
      </div>
    </Pane>
  );
}
