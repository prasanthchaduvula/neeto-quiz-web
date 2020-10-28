import React, { useEffect, useState } from "react";
import { PageHeading } from "nitroui/layouts";
import { Button } from "nitroui";
import ReactPlayer from "react-player";
import { PDFReader } from "reactjs-pdf-reader";
import Viewer from "react-viewer";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { getChapter } from "apis/chapters";

function Lesson({ lesson, content, courseId, getLesson }) {
  const [lessonIds, setLessonIds] = useState([]);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    loadChapter(lesson.chapter_id);
  }, [lesson.chapter_id]);

  function loadChapter(chapterId) {
    if (lesson.chapter_id) {
      getChapter(courseId, chapterId).then(response => {
        const lessonIds = response.data.lessons.map(lesson => lesson.id);
        setLessonIds(lessonIds);
      });
    }
  }
  const handleNextButton = lessonId => {
    if (lessonIds.includes(lessonId)) {
      const index = lessonIds.indexOf(lessonId);
      const nextLessonId = lessonIds[index + 1];
      getLesson(lesson.chapter_id, nextLessonId);
    }
  };

  const handlePreviousButton = lessonId => {
    if (lessonIds.includes(lessonId)) {
      const index = lessonIds.indexOf(lessonId);
      const previousLessonId = lessonIds[index - 1];
      getLesson(lesson.chapter_id, previousLessonId);
    }
  };

  return (
    <div className="p-2 w-full ml-2  p-4 ">
      <PageHeading
        title={lesson.name}
        customClass="border-none font-semibold text-2xl"
      />
      <div className="p-3 mt-3 rounded-md text-lg p-2">
        <p className="text-gray-600 leading-tight">{lesson.description}</p>
      </div>
      <div className="my-3 p-3">
        {lesson.content != null ? (
          <ReactPlayer url={lesson.content} controls={true} width={`100%`} />
        ) : lesson.lesson_type == "pdf" ? (
          <PDFReader url={content} />
        ) : (
          <div>
            <Button
              className="my-2"
              label="see Image"
              onClick={() => setVisible(true)}
            />
            <Viewer
              width="45%"
              height="55%"
              visible={visible}
              onClose={() => {
                setVisible(false);
              }}
              images={[{ src: `${content}`, alt: "Image" }]}
            />
          </div>
        )}
      </div>

      <div className="flex justify-center mb-0">
        {lessonIds && lessonIds[0] != lesson.id ? (
          <Button
            className="mx-2"
            label="Previous"
            onClick={() => {
              handlePreviousButton(lesson.id);
            }}
          />
        ) : null}
        {lessonIds && lessonIds[lessonIds.length - 1] != lesson.id ? (
          <Button
            className="mx-2"
            label="Next"
            onClick={() => handleNextButton(lesson.id)}
          />
        ) : null}
      </div>
    </div>
  );
}

export default Lesson;
