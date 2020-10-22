import React from "react";
import { Pane } from "nitroui";

export default function NewLessonPane(props) {
  const onClose = () => props.setShowPane(false);
  return (
    <Pane title="Add a new lesson" isOpen={props.showPane} onClose={onClose}>
      <div className="p-6">Lesson</div>
    </Pane>
  );
}
