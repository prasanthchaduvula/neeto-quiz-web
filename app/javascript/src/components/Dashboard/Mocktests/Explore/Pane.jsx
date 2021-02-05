import React from "react";
import { Pane } from "neetoui";
import Details from "../Join/Details";

export default function ExplorMocktestPane({
  setShowPane,
  showPane,
  mocktest,
}) {
  const onClose = () => {
    setShowPane(false);
  };

  return (
    <Pane title="Join Mocktest" isOpen={showPane} onClose={onClose}>
      <div className="px-6">
        <Details onClose={onClose} mocktest={mocktest} />
      </div>
    </Pane>
  );
}
