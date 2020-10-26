import React from "react";
import { Pane } from "nitroui";
import ChapterForm from "../ChapterForm";

export default function AddChapterPane(props) {
  const onClose = () => props.setShowPane(false);
  return (
    <Pane title="Add a new chapter" isOpen={props.showPane} onClose={onClose}>
      <div className="p-6">
        <ChapterForm
          onClose={onClose}
          course={props.course}
          chapter=""
          isCreateForm={true}
          fetchSingleCourse={props.fetchSingleCourse}
        />
      </div>
    </Pane>
  );
}
