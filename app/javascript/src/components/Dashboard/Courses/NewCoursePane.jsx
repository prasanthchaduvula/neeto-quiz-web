import React from "react";
import { Pane } from "nitroui";
import NewCourseForm from "./NewCourseForm";

export default function NewCoursePane(props) {
  const onClose = () => props.setShowPane(false);
  return (
    <Pane
      title="Create a new note"
      isOpen={props.showPane}
      onClose={props.onClose}
    >
      <div className="p-6">
        <NewCourseForm onClose={onClose} />
      </div>
    </Pane>
  );
}
