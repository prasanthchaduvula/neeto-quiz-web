import React from "react";
import { Pane } from "nitroui";
import ListStudents from "./ListStudents";

export default function Students({ setShowPane, showPane, students }) {
  const onClose = () => setShowPane(false);
  return (
    <Pane title="Students" isOpen={showPane} onClose={onClose}>
      <div className="px-6">
        <ListStudents students={students} />
      </div>
    </Pane>
  );
}
