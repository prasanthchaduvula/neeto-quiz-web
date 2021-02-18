import React, { useState } from "react";
import { PageHeading } from "neetoui/layouts";
import { Button, Toastr } from "neetoui";
import ReactPlayer from "react-player";
import { Document, Page, pdfjs } from "react-pdf";
import Viewer from "react-viewer";
import { Link, withRouter } from "react-router-dom";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function Lesson({ history, lesson, courseId, chapters, setShowPane }) {
  const [visible, setVisible] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => setNumPages(numPages);
  const goToPrevPage = () => setPageNumber(pageNumber - 1);
  const goToNextPage = () => setPageNumber(pageNumber + 1);

  const previousLessson = (lessonId, chapterId) => {
    chapters.filter(({ chapter, lessons }, chapterIndex) => {
      if (chapter.id == chapterId) {
        lessons.filter((lesson, lessonIndex) => {
          if (lesson.id == lessonId) {
            if (lessonIndex - 1 < 0) {
              if (chapterIndex == 0) {
                Toastr.success("This is the first lesson");
              } else if (chapters[chapterIndex - 1].lessons.length == 0) {
                let previousChapter = chapters[chapterIndex - 2];
                let previousChapterId = previousChapter.chapter.id;
                let previousLessonId =
                  previousChapter.lessons[previousChapter.lessons.length - 1]
                    .id;
                history.push(
                  `/courses/${courseId}/chapters/${previousChapterId}/lessons/${previousLessonId}`
                );
              } else {
                let previousChapter = chapters[chapterIndex - 1];
                let previousChapterId = previousChapter.chapter.id;
                let previousLessonId =
                  previousChapter.lessons[previousChapter.lessons.length - 1]
                    .id;
                history.push(
                  `/courses/${courseId}/chapters/${previousChapterId}/lessons/${previousLessonId}`
                );
              }
            } else {
              let previousLessonId = lessons[lessonIndex - 1].id;
              history.push(
                `/courses/${courseId}/chapters/${chapter.id}/lessons/${previousLessonId}`
              );
            }
          }
        });
      }
    });
  };

  const nextLessson = (lessonId, chapterId) => {
    chapters.filter(({ chapter, lessons }, chapterIndex) => {
      if (chapter.id == chapterId) {
        lessons.filter((lesson, lessonIndex) => {
          if (lesson.id == lessonId) {
            if (lessonIndex + 1 == lessons.length) {
              if (chapters.length == chapterIndex + 1) {
                Toastr.success("This is the last lesson");
              } else if (chapters[chapterIndex + 1].lessons.length == 0) {
                let nextLessonId = chapters[chapterIndex + 2].lessons[0].id;
                let nextChapterId = chapters[chapterIndex + 2].chapter.id;
                history.push(
                  `/courses/${courseId}/chapters/${nextChapterId}/lessons/${nextLessonId}`
                );
              } else {
                let nextLessonId = chapters[chapterIndex + 1].lessons[0].id;
                let nextChapterId = chapters[chapterIndex + 1].chapter.id;
                history.push(
                  `/courses/${courseId}/chapters/${nextChapterId}/lessons/${nextLessonId}`
                );
              }
            } else {
              let nextLessonId = lessons[lessonIndex + 1].id;
              history.push(
                `/courses/${courseId}/chapters/${chapter.id}/lessons/${nextLessonId}`
              );
            }
          }
        });
      }
    });
  };

  return (
    <div className="w-full">
      <PageHeading
        title={lesson.name}
        breadcrumbLinks={
          <Button
            className="text-xl font-bold mr-6"
            onClick={() => {
              setShowPane(true);
            }}
            icon="ri-menu-line"
          />
        }
        rightButton={() => (
          <Link to={`/courses/${courseId}`} className="no-underline">
            <Button
              style="secondary"
              label="Go to course"
              icon="ri-arrow-left-line"
            />
          </Link>
        )}
      />
      <div className="p-3 overflow-y-scroll" style={{ height: "85vh" }}>
        <div className="mt-3">
          <p className="text-black text-base leading-normal">
            {lesson.description}
          </p>
        </div>
        <div className="py-3 flex justify-center items-center">
          {lesson.lesson_type == "youtube" && (
            <ReactPlayer
              url={lesson.content}
              controls={true}
              width={`60%`}
              height={`60vh`}
            />
          )}
          {lesson.lesson_type == "pdf" && (
            <div className="text-center">
              <Document
                file={lesson.lessonAttachment}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                <Page pageNumber={pageNumber} />
              </Document>
              <nav className="flex justify-center items-center mt-4">
                {pageNumber != 1 && (
                  <Button
                    style="secondary"
                    onClick={() => goToPrevPage()}
                    icon="ri-arrow-left-line"
                  />
                )}
                <p className="text-center mx-2">
                  Page {pageNumber} of {numPages}
                </p>
                {pageNumber != numPages && (
                  <Button
                    style="secondary"
                    onClick={() => goToNextPage()}
                    icon="ri-arrow-right-line"
                  />
                )}
              </nav>
            </div>
          )}
          {lesson.lesson_type == "image" && (
            <>
              <img
                src={lesson.lessonAttachment}
                onClick={() => setVisible(true)}
              />
              <Viewer
                width="45%"
                height="55%"
                visible={visible}
                onClose={() => {
                  setVisible(false);
                }}
                images={[{ src: `${lesson.lessonAttachment}`, alt: "Image" }]}
              />
            </>
          )}
        </div>
      </div>
      <div className="absolute bottom-0 w-11/12 bg-white flex justify-between nui-pane--footer py-2 ">
        <Button
          label="Previous"
          icon="ri-arrow-left-s-line"
          onClick={() => previousLessson(lesson.id, lesson.chapter_id)}
        />
        <Button
          label="Next"
          icon="ri-arrow-right-s-line"
          iconPosition="right"
          onClick={() => nextLessson(lesson.id, lesson.chapter_id)}
        />
      </div>
    </div>
  );
}

export default withRouter(Lesson);
