import React from "react";
import { Pane } from "nitroui";
import ChapterForm from "./ChapterForm";

export default function EditChapterPane(props) {
  const onClose = () => props.setShowPane(false);
  return (
    <Pane title="Edit chapter" isOpen={props.showPane} onClose={onClose}>
      <div className="p-6">
        <ChapterForm
          onClose={onClose}
          course={props.course}
          chapter={props.chapter}
          isCreateForm={false}
          fetchSingleCourse={props.fetchSingleCourse}
        />
      </div>
    </Pane>
  );
}
