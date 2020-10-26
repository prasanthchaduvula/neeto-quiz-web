import React from "react";
import { Pane } from "nitroui";
import ChapterForm from "../ChapterForm";

export default function EditChapterPane({
  setShowPane,
  showPane,
  course,
  chapter,
  fetchSingleCourse,
}) {
  const onClose = () => setShowPane(false);
  return (
    <Pane title="Edit chapter" isOpen={showPane} onClose={onClose}>
      <div className="px-6">
        <ChapterForm
          onClose={onClose}
          course={course}
          chapter={chapter}
          isCreateForm={false}
          fetchSingleCourse={fetchSingleCourse}
        />
      </div>
    </Pane>
  );
}
