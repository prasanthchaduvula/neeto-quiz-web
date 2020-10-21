import React from "react";
import { Pane } from "nitroui";
import NewCourseForm from "./NewCourseForm";

export default function NewCoursePane(props) {
  const onClose = () => props.setShowPane(false);
  return (
    <Pane title="Create a new note" isOpen={props.showPane} onClose={onClose}>
      <div className="p-6">
        <NewCourseForm onClose={onClose} refetch={props.fetchCourses} />
      </div>
    </Pane>
  );
}
