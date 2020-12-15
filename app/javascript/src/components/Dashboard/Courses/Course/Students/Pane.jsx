import React from "react";
import { Pane } from "neetoui";
import StudentForm from "./Form";

export default function StudentPane({
  setShowPane,
  showPane,
  course,
  fetchSingleCourse,
}) {
  const onClose = () => setShowPane(false);
  return (
    <Pane title="Add student" isOpen={showPane} onClose={onClose}>
      <div className="px-6">
        <StudentForm
          onClose={onClose}
          course={course}
          fetchSingleCourse={fetchSingleCourse}
        />
      </div>
    </Pane>
  );
}
