import React, { useEffect, useState } from "react";
import { PageHeading } from "nitroui/layouts";
import { Button } from "nitroui";
import ReactPlayer from "react-player";
import { Document, Page, pdfjs } from "react-pdf";
import Viewer from "react-viewer";
import { getChapter } from "apis/chapters";
import PreviousButton from "./PreviousButton";
import NextButton from "./NextButton";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function Lesson({ lesson, content, courseId, getLesson, chapters }) {
  const [lessonIds, setLessonIds] = useState([]);
  const [visible, setVisible] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

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

  const handleNextChapterButton = chapterId => {
    const currentChapterIndex = getChapterIndex(chapterId);
    const nextChapterObject = chapters[currentChapterIndex + 1];
    getLesson(nextChapterObject.chapter.id, nextChapterObject.lessons[0].id);
  };

  const handlePreviousButton = lessonId => {
    if (lessonIds.includes(lessonId)) {
      const index = lessonIds.indexOf(lessonId);
      const previousLessonId = lessonIds[index - 1];
      getLesson(lesson.chapter_id, previousLessonId);
    }
  };

  const handlePreviousChapterButton = chapterId => {
    const currentChapterIndex = getChapterIndex(chapterId);
    const previousChapterObject = chapters[currentChapterIndex - 1];
    getLesson(
      previousChapterObject.chapter.id,
      previousChapterObject.lessons[previousChapterObject.lessons.length - 1].id
    );
  };

  const isFirstChapter = chapterId => {
    return getChapterIndex(chapterId) === 0;
  };

  const isLastChapter = chapterId => {
    return getChapterIndex(chapterId) === chapters.length - 1;
  };

  const getChapterIndex = chapterId => {
    return chapters.findIndex(obj => obj.chapter.id == chapterId);
  };

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const goToPrevPage = () => setPageNumber(pageNumber - 1);
  const goToNextPage = () => setPageNumber(pageNumber + 1);

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
          <div className="teext-center">
            <Document file={content} onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={pageNumber} />
            </Document>

            <nav className="flex justify-center content-center">
              {pageNumber != 1 && (
                <Button
                  onClick={() => goToPrevPage()}
                  icon="ri-arrow-left-line"
                />
              )}
              <p className="text-center mx-2">
                Page {pageNumber} of {numPages}
              </p>
              {pageNumber != numPages && (
                <Button
                  onClick={() => goToNextPage()}
                  icon="ri-arrow-right-line"
                />
              )}
            </nav>
          </div>
        ) : (
          <>
            <img src={content} onClick={() => setVisible(true)} />
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
        <PreviousButton
          lesson={lesson}
          lessonIds={lessonIds}
          handlePreviousButton={handlePreviousButton}
          handlePreviousChapterButton={handlePreviousChapterButton}
          isFirstChapter={isFirstChapter(lesson.chapter_id)}
        />
        <NextButton
          lesson={lesson}
          lessonIds={lessonIds}
          handleNextButton={handleNextButton}
          handleNextChapterButton={handleNextChapterButton}
          isLastChapter={isLastChapter(lesson.chapter_id)}
        />
      </div>
    </div>
  );
}

export default Lesson;
