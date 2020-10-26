import React from "react";
import { Pane } from "nitroui";
import ChapterForm from "./Form";

export default function ChapterPane({
  setShowPane,
  showPane,
  isCreateForm,
  course,
  chapter,
  fetchSingleCourse,
}) {
  const onClose = () => setShowPane(false);
  return (
    <Pane
      title={isCreateForm ? "Add Chapter" : "Edit Chapter"}
      isOpen={showPane}
      onClose={onClose}
    >
      <div className="px-6">
        <ChapterForm
          onClose={onClose}
          isCreateForm={isCreateForm}
          course={course}
          chapter={chapter}
          fetchSingleCourse={fetchSingleCourse}
        />
      </div>
    </Pane>
  );
}
