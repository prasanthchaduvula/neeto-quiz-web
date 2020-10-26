import React from "react";
import { Pane } from "nitroui";
import ChapterForm from "../ChapterForm";

export default function AddChapterPane({
  setShowPane,
  showPane,
  course,
  fetchSingleCourse,
}) {
  const onClose = () => setShowPane(false);
  return (
    <Pane title="Add a new chapter" isOpen={showPane} onClose={onClose}>
      <div className="p-6">
        <ChapterForm
          onClose={onClose}
          course={course}
          chapter=""
          isCreateForm={true}
          fetchSingleCourse={fetchSingleCourse}
        />
      </div>
    </Pane>
  );
}
