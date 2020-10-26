import React from "react";
import { Pane } from "nitroui";
import LessonForm from "../LessonForm";

export default function EditLessonPane({
  setShowPane,
  showPane,
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
          chapter={chapter}
          lesson={lesson}
          isCreateForm={false}
          fetchSingleCourse={fetchSingleCourse}
        />
      </div>
    </Pane>
  );
}
