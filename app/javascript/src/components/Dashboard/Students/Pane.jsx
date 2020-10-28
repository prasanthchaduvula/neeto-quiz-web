import React from "react";
import { Pane } from "nitroui";
import StudentForm from "./Form";

export default function StudentPane({ setShowPane, showPane }) {
  const onClose = () => setShowPane(false);
  return (
    <Pane title="Students" isOpen={showPane} onClose={onClose}>
      <div className="px-6">
        <StudentForm onClose={onClose} />
      </div>
    </Pane>
  );
}
