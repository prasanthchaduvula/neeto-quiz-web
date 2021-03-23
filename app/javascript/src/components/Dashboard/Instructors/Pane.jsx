import React from "react";
import { Pane } from "neetoui";
import InstrcuctorsForm from "./Form";
import Info from "./Info";
import UnjoinedCourses from "./Info/UnjoinedCourses";
import UnjoinedMocktests from "./Info/UnjoinedMocktests";

export default function InstructorsPane({
  setPaneMode,
  setPaneTitle,
  paneTitle,
  paneMode,
  showPane,
  setShowPane,
  loadInstructors,
  instructor,
}) {
  const onClose = () => setShowPane(false);

  const renderPane = () => {
    switch (paneMode) {
      case "form":
        return (
          <InstrcuctorsForm
            onClose={onClose}
            loadInstructors={loadInstructors}
            instructor={instructor}
          />
        );
      case "info":
        return (
          <Info
            onClose={onClose}
            id={instructor.id}
            setPaneMode={setPaneMode}
            setPaneTitle={setPaneTitle}
          />
        );
      case "unjoined courses":
        return (
          <UnjoinedCourses
            instructor={instructor}
            setPaneMode={setPaneMode}
            setPaneTitle={setPaneTitle}
          />
        );
      case "unjoined mocktests":
        return (
          <UnjoinedMocktests
            instructor={instructor}
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
