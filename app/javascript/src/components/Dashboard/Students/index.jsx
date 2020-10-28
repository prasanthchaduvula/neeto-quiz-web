import React from "react";
import { Pane } from "nitroui";

export default function Students({ setShowPane, showPane }) {
  const onClose = () => setShowPane(false);
  return (
    <Pane title="Students" isOpen={showPane} onClose={onClose}>
      <div className="px-6">this is form</div>
    </Pane>
  );
}
