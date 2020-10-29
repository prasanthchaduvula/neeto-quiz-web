import React from "react";
import { Button } from "nitroui";

const NextButton = ({
  lesson,
  lessonIds,
  handleNextButton,
  handleNextChapterButton,
  isLastChapter,
}) => {
  const isLastLesson = lessonIds[lessonIds.length - 1] == lesson.id;
  if (isLastChapter && isLastLesson) {
    return null;
  }
  if (!isLastChapter && isLastLesson) {
    return (
      <Button
        className="mx-2"
        label="Next Chapter"
        onClick={() => {
          handleNextChapterButton(lesson.chapter_id);
        }}
      />
    );
  }
  return (
    <Button
      className="mx-2"
      label="Next"
      onClick={() => {
        handleNextButton(lesson.id);
      }}
    />
  );
};

export default NextButton;
