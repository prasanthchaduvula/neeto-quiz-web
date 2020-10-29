import React, { useEffect, useState } from "react";
import { PageHeading } from "nitroui/layouts";
import { Button } from "nitroui";
import ReactPlayer from "react-player";
import { Document, Page, pdfjs } from "react-pdf";
import Viewer from "react-viewer";
import { getChapter } from "apis/chapters";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function Lesson({ lesson, content, courseId, getLesson }) {
  const [lessonIds, setLessonIds] = useState([]);
  const [visible, setVisible] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber] = useState(1);

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

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="p-2 w-full ml-2  p-4 ">
      <PageHeading
        title={lesson.name}
        customClass="border-none font-semibold text-2xl"
      />
      <div className="p-3 mt-3 rounded-md text-lg p-2">
        <p className="text-gray-600 ">{lesson.description}</p>
      </div>
      <div className="my-3 p-3">
        {lesson.content != null ? (
          <ReactPlayer url={lesson.content} controls={true} width={`100%`} />
        ) : lesson.lesson_type == "pdf" ? (
          <>
            <Document file={content} onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={pageNumber} />
            </Document>
            <p className="text-center">
              Page {pageNumber} of {numPages}
            </p>
          </>
        ) : (
          <>
            <Button
              className="my-2"
              label="See Image"
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
          </>
        )}
      </div>

      <div className="flex justify-center mb-0">
        {lessonIds && lessonIds[0] != lesson.id && (
          <Button
            className="mx-2"
            label="Previous"
            onClick={() => {
              handlePreviousButton(lesson.id);
            }}
          />
        )}
        {lessonIds && lessonIds[lessonIds.length - 1] != lesson.id && (
          <Button
            className="mx-2"
            label="Next"
            onClick={() => handleNextButton(lesson.id)}
          />
        )}
      </div>
    </div>
  );
}

export default Lesson;
