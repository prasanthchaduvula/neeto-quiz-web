import React from "react";
import { Pane } from "neetoui";
import ListStudents from "./ListStudents";

export default function Students({
  setShowPane,
  showPane,
  students,
  mocktest,
  fetchSingleMocktest,
}) {
  const onClose = () => setShowPane(false);
  return (
    <Pane title="Students" isOpen={showPane} onClose={onClose}>
      <div className="px-6">
        <ListStudents
          onClose={onClose}
          students={students}
          mocktest={mocktest}
          fetchSingleMocktest={fetchSingleMocktest}
        />
      </div>
    </Pane>
  );
}
