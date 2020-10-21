import React from "react";
import { Pane } from "nitroui";

export default function EditCoursePane(props) {
  const onClose = () => props.setShowPane(false);
  return (
    <Pane title="Edit Course" isOpen={props.showPane} onClose={onClose}>
      <div className="p-6">Edit course Pane</div>
    </Pane>
  );
}
