import React from "react";
import { Pane } from "nitroui";
import LessonForm from "./LessonForm";

export default function NewLessonPane({
  setShowPane,
  showPane,
  chapter,
  fetchSingleCourse,
}) {
  const onClose = () => setShowPane(false);
  return (
    <Pane title="Add a new lesson" isOpen={showPane} onClose={onClose}>
      <div className="p-6">
        <LessonForm
          onClose={onClose}
          chapter={chapter}
          lesson={{ lesson_type: "youtube" }}
          isCreateForm={true}
          fetchSingleCourse={fetchSingleCourse}
        />
      </div>
    </Pane>
  );
}
