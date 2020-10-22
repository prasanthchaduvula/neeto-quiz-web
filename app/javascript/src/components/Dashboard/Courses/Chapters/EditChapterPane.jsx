import React, { useState } from "react";
import { Pane } from "nitroui";
import ChapterForm from "./ChapterForm";

export default function EditChapterPane(props) {
  const [chapterName] = useState(props.chapterDetails.chapter.name);

  const onClose = () => props.setShowPane(false);

  return (
    <Pane title="Edit Chapter" isOpen={props.showPane} onClose={onClose}>
      <div className="p-6">
        <ChapterForm
          onClose={onClose}
          isCreateForm={false}
          chapterName={chapterName}
          courseId={props.chapterDetails.chapter.course_id}
          chapterId={props.chapterDetails.chapter.id}
          setChapter={props.setChapter}
        />
      </div>
    </Pane>
  );
}
