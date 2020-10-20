import React from "react";
import { Pane } from "nitroui";

export default function NewCoursePane(props) {
  return (
    <Pane
      title="Create a new note"
      isOpen={props.showPane}
      onClose={props.onClose}
    >
      <div className="p-6">
        <h1>PAne</h1>
      </div>
    </Pane>
  );
}
