import React from "react";
import { Button } from "nitroui";

const NextButton = ({
  lesson,
  lessonIds,
  publishedLessonIds,
  handleNextButton,
  handleNextChapterButton,
  isLastChapter,
  isLastChapterWithPublishedLessons,
  isStudent,
}) => {
  const isLastLesson = lessonIds[lessonIds.length - 1] == lesson.id;
  const isLastPublishedLesson =
    publishedLessonIds[publishedLessonIds.length - 1] == lesson.id;
  const navigationForStudent = () => {
    if (isLastChapterWithPublishedLessons && isLastPublishedLesson) {
      return null;
    }
    if (!isLastChapterWithPublishedLessons && isLastPublishedLesson) {
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
  const navigationForTeacher = () => {
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
  if (isStudent) {
    return navigationForStudent();
  } else {
    return navigationForTeacher();
  }
};

export default NextButton;
