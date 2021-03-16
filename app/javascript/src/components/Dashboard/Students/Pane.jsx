import React from "react";
import { Pane } from "neetoui";
import StudentsForm from "./Form";
import Info from "./Info";

export default function StudentsPane({
  setPaneMode,
  setPaneTitle,
  paneTitle,
  paneMode,
  showPane,
  setShowPane,
  loadStudents,
  student,
}) {
  const onClose = () => setShowPane(false);

  const renderPane = () => {
    switch (paneMode) {
      case "form":
        return (
          <StudentsForm
            onClose={onClose}
            loadStudents={loadStudents}
            student={student}
          />
        );
      case "info":
        return (
          <Info
            id={student.id}
            setPaneMode={setPaneMode}
            setPaneTitle={setPaneTitle}
          />
        );
    }
  };

  return (
    <Pane title={paneTitle} isOpen={showPane} onClose={onClose}>
      <div className="px-6">{renderPane()}</div>
    </Pane>
  );
}
