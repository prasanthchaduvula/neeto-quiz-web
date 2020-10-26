import React from "react";
import { Pane } from "nitroui";
import LessonForm from "./Form";

export default function LessonPane({
  setShowPane,
  showPane,
  isCreateForm,
  chapter,
  lesson,
  fetchSingleCourse,
}) {
  const onClose = () => setShowPane(false);
  return (
    <Pane title="Edit lesson" isOpen={showPane} onClose={onClose}>
      <div className="px-6">
        <LessonForm
          onClose={onClose}
          isCreateForm={isCreateForm}
          chapter={chapter}
          lesson={lesson}
          fetchSingleCourse={fetchSingleCourse}
        />
      </div>
    </Pane>
  );
}
