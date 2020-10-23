import React from "react";
import { Pane } from "nitroui";
import LessonForm from "./LessonForm";

export default function NewLessonPane(props) {
  const onClose = () => props.setShowPane(false);
  return (
    <Pane title="Add a new lesson" isOpen={props.showPane} onClose={onClose}>
      <div className="p-6">
        <LessonForm
          onClose={onClose}
          chapter={props.chapter}
          isCreateForm={true}
          fetchSingleCourse={props.fetchSingleCourse}
        />
      </div>
    </Pane>
  );
}
