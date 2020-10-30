import React from "react";
import { Button } from "nitroui";

const PreviousButton = ({
  lesson,
  lessonIds,
  publishedLessonIds,
  handlePreviousButton,
  handlePreviousChapterButton,
  isFirstChapter,
  isFirstChapterWithPublishedLessons,
  isStudent,
}) => {
  const isFirstLesson = lessonIds[0] == lesson.id;
  const isFirstPublishedLesson = publishedLessonIds[0] == lesson.id;
  const navigationForStudent = () => {
    if (isFirstChapterWithPublishedLessons && isFirstPublishedLesson) {
      return null;
    }
    if (!isFirstChapterWithPublishedLessons && isFirstPublishedLesson) {
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

  const navigationForTeacher = () => {
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
  if (isStudent) {
    return navigationForStudent();
  } else {
    return navigationForTeacher();
  }
};

export default PreviousButton;
