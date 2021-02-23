import React from "react";
import { Pane } from "neetoui";
import TableOfContents from "./TableOfContents";

export default function SidePanel({
  showPanel,
  setShowPane,
  course,
  chapters,
  getLesson,
  lesson,
}) {
  const onClose = () => {
    setShowPane(false);
  };

  return showPanel ? (
    <Pane
      title="Table of Contents"
      isOpen={showPanel}
      onClose={onClose}
      className="bg-gray-100"
      position="left"
    >
      <div className="px-6">
        {chapters.map(chapter => (
          <TableOfContents
            key={chapter.chapter.id}
            course={course}
            chapter={chapter.chapter}
            lessons={chapter.lessons}
            onLessonSelect={getLesson}
            lesson={lesson}
            onClose={onClose}
          />
        ))}
      </div>
    </Pane>
  ) : (
    ""
  );
}
