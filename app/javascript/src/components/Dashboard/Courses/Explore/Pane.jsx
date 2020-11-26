import React from "react";
import { Pane } from "neetoui";
import Details from "../Join/Details";

export default function ExplorCoursePane({
  setShowPane,
  showPane,
  course,
  chapters,
}) {
  const onClose = () => {
    setShowPane(false);
  };
  return (
    <Pane title="Join Course" isOpen={showPane} onClose={onClose}>
      <Details onClose={onClose} course={course} chapters={chapters} />
    </Pane>
  );
}
