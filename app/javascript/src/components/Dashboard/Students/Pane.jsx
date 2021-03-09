import React from "react";
import { Pane } from "neetoui";
import StudentsForm from "./Form";

export default function StudentsPane({ showPane, setShowPane, loadStudents }) {
  const onClose = () => setShowPane(false);

  return (
    <Pane title="Add Student" isOpen={showPane} onClose={onClose}>
      <div className="px-6">
        <StudentsForm onClose={onClose} loadStudents={loadStudents} />
      </div>
    </Pane>
  );
}
