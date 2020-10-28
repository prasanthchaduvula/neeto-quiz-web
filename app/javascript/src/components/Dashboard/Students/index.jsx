import React from "react";
import { Pane, Button } from "nitroui";
import ListStudents from "./ListStudents";

export default function Students({ setShowPane, showPane, students }) {
  const onClose = () => setShowPane(false);
  return (
    <Pane title="Students" isOpen={showPane} onClose={onClose}>
      <div className="px-6">
        <ListStudents students={students} />
      </div>
      <div className="absolute bottom-0 left-0 w-full bg-white nui-pane--footer">
        <Button label="Add" />
      </div>
    </Pane>
  );
}
