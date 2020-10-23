import React from "react";
import { Pane } from "nitroui";
import ChapterForm from "./ChapterForm";

export default function EditChapterPane(props) {
  const onClose = () => props.setShowPane(false);

  return (
    <Pane title="Edit Chapter" isOpen={props.showPane} onClose={onClose}>
      <div className="p-6">
        {props.chapterDetails.chapter ? (
          <ChapterForm
            onClose={onClose}
            isCreateForm={false}
            chapterName={props.chapterDetails.chapter.name}
            courseId={props.chapterDetails.chapter.course_id}
            chapterId={props.chapterDetails.chapter.id}
            setChapter={props.setChapter}
            refetch={props.refetch}
          />
        ) : (
          <h1>Chapter Pane</h1>
        )}
      </div>
    </Pane>
  );
}
