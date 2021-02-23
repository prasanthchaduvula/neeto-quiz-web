import React, { useState } from "react";
import { PageHeading } from "neetoui/layouts";
import { Button, Toastr } from "neetoui";
import ReactPlayer from "react-player";
import { Document, Page, pdfjs } from "react-pdf";
import Viewer from "react-viewer";
import { Link, withRouter } from "react-router-dom";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function Lesson({ history, lesson, courseId, lessons, setShowPane }) {
  const [visible, setVisible] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => setNumPages(numPages);
  const goToPrevPage = () => setPageNumber(pageNumber - 1);
  const goToNextPage = () => setPageNumber(pageNumber + 1);

  const previousLessson = lessonId => {
    lessons &&
      lessons.map((lesson, lessonIndex) => {
        if (lessonId == lesson.id) {
          if (lessonIndex - 1 < 0) {
            Toastr.success("This is the first lesson");
          } else {
            let previousLesson = lessons[lessonIndex - 1];
            history.push(
              `/courses/${courseId}/chapters/${previousLesson.chapter_id}/lessons/${previousLesson.id}`
            );
          }
        }
      });
  };

  const nextLessson = lessonId => {
    lessons &&
      lessons.map((lesson, lessonIndex) => {
        if (lessonId == lesson.id) {
          if (lessonIndex + 1 == lessons.length) {
            Toastr.success("This is the last lesson");
          } else {
            let nextLessson = lessons[lessonIndex + 1];
            history.push(
              `/courses/${courseId}/chapters/${nextLessson.chapter_id}/lessons/${nextLessson.id}`
            );
          }
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
          onClick={() => previousLessson(lesson.id)}
        />
        <Button
          label="Next"
          icon="ri-arrow-right-s-line"
          iconPosition="right"
          onClick={() => nextLessson(lesson.id)}
        />
      </div>
    </div>
  );
}

export default withRouter(Lesson);
