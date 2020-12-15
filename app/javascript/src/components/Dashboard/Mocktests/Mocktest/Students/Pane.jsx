import React from "react";
import { Pane } from "neetoui";
import StudentForm from "./Form";

export default function StudentPane({
  setShowPane,
  showPane,
  mocktest,
  fetchSingleMocktest,
}) {
  const onClose = () => setShowPane(false);
  return (
    <Pane title="Add student" isOpen={showPane} onClose={onClose}>
      <div className="px-6">
        <StudentForm
          onClose={onClose}
          mocktest={mocktest}
          fetchSingleMocktest={fetchSingleMocktest}
        />
      </div>
    </Pane>
  );
}
