import React from "react";
import { Pane } from "nitroui";
import LessonForm from "./LessonForm";

export default function EditLessonPane(props) {
  const onClose = () => props.setShowPane(false);
  return (
    <Pane title="Add a new lesson" isOpen={props.showPane} onClose={onClose}>
      <div className="p-6">
        <LessonForm
          onClose={onClose}
          chapter={props.chapter}
          lesson={props.lesson}
          isCreateForm={false}
          fetchSingleCourse={props.fetchSingleCourse}
        />
      </div>
    </Pane>
  );
}
