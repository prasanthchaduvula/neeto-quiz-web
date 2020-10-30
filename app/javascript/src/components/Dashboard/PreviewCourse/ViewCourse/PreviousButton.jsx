import React from "react";
import { Button } from "nitroui";

const PreviousButton = ({
  lesson,
  lessonIds,
  handlePreviousButton,
  handlePreviousChapterButton,
  isFirstChapter,
}) => {
  const isFirstLesson = lessonIds[0] == lesson.id;
  if (isFirstChapter && isFirstLesson) {
    return null;
  }
  if (!isFirstChapter && isFirstLesson) {
    return (
      <Button
        className="mx-2"
        label="Previous Chapter"
        onClick={() => {
          handlePreviousChapterButton(lesson.chapter_id);
        }}
      />
    );
  }
  return (
    <Button
      className="mx-2"
      label="Previous"
      onClick={() => {
        handlePreviousButton(lesson.id);
      }}
    />
  );
};

export default PreviousButton;
