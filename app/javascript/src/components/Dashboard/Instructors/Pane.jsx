import React from "react";
import { Pane } from "neetoui";
import InstrcuctorsForm from "./Form";

export default function InstructorsPane({
  showPane,
  setShowPane,
  loadInstructors,
}) {
  const onClose = () => setShowPane(false);

  return (
    <Pane title="Add Instructor" isOpen={showPane} onClose={onClose}>
      <div className="px-6">
        <InstrcuctorsForm onClose={onClose} loadInstructors={loadInstructors} />
      </div>
    </Pane>
  );
}
