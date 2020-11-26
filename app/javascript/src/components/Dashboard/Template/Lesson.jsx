import React, { useEffect, useState } from "react";
import { PageHeading } from "neetoui/layouts";
import { Button } from "neetoui";
import ReactPlayer from "react-player";
import { Document, Page, pdfjs } from "react-pdf";
import Viewer from "react-viewer";
import { getChapter } from "apis/chapters";
import PreviousButton from "./PreviousButton";
import NextButton from "./NextButton";
import { Link, withRouter } from "react-router-dom";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function Lesson({
  lesson,
  courseId,
  chapters,
  isStudent,
  setShowPane,
  history,
}) {
  const [lessonIds, setLessonIds] = useState([]);
  const [publishedLessonIds, setPublishedLessonIds] = useState([]);
  const [visible, setVisible] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function loadChaptersWithPublishedlessons() {
    return chapters.filter(chapter => {
      if (chapter.lessons.filter(lesson => lesson.is_published).length > 0) {
        return chapter;
      }
    });
  }

  useEffect(() => {
    loadChapter(lesson.chapter_id);
  }, [lesson.chapter_id]);

  function loadChapter(chapterId) {
    if (lesson.chapter_id) {
      getChapter(courseId, chapterId).then(response => {
        const lessonIds = response.data.lessons.map(lesson => lesson.id);
        const publishedLessonIds = response.data.lessons
          .filter(lesson => lesson.is_published)
          .map(lesson => lesson.id);
        setLessonIds(lessonIds);
        setPublishedLessonIds(publishedLessonIds);
      });
    }
  }

  const lessonUrl = (chapterId, lessonId) => {
    history.push(
      `/courses/${courseId}/chapters/${chapterId}/lessons/${lessonId}`
    );
  };

  const handleNextButton = lessonId => {
    if (isStudent == true) {
      const index = publishedLessonIds.indexOf(lessonId);
      const nextLessonId = publishedLessonIds[index + 1];
      lessonUrl(lesson.chapter_id, nextLessonId);
    } else {
      const index = lessonIds.indexOf(lessonId);
      const nextLessonId = lessonIds[index + 1];
      lessonUrl(lesson.chapter_id, nextLessonId);
    }
  };

  const handleNextChapterButton = chapterId => {
    if (isStudent == true) {
      const currentChapterIndex = loadChaptersWithPublishedlessons().findIndex(
        obj => obj.chapter.id == chapterId
      );
      const nextChapterObject = loadChaptersWithPublishedlessons()[
        currentChapterIndex + 1
      ];
      getLessonForNextChapter(nextChapterObject);
    } else {
      const currentChapterIndex = getChapterIndex(chapterId);
      const nextChapterObject = chapters[currentChapterIndex + 1];
      if (nextChapterObject.lessons.length > 0) {
        lessonUrl(
          nextChapterObject.chapter.id,
          nextChapterObject.lessons[0].id
        );
      }
    }
  };

  const getLessonForNextChapter = ChapterObject => {
    const publishedLessons = ChapterObject.lessons.filter(
      lesson => lesson.is_published
    );
    if (ChapterObject.lessons.length > 0) {
      lessonUrl(ChapterObject.chapter.id, publishedLessons[0].id);
    }
  };

  const getLessonForPreviousChapter = ChapterObject => {
    const publishedLessons = ChapterObject.lessons.filter(
      lesson => lesson.is_published
    );
    if (ChapterObject.lessons.length > 0) {
      lessonUrl(
        ChapterObject.chapter.id,
        publishedLessons[publishedLessons.length - 1].id
      );
    }
  };

  const handlePreviousButton = lessonId => {
    if (isStudent == true) {
      const index = publishedLessonIds.indexOf(lessonId);
      const previousLessonId = publishedLessonIds[index - 1];
      lessonUrl(lesson.chapter_id, previousLessonId);
    } else {
      const index = lessonIds.indexOf(lessonId);
      const previousLessonId = lessonIds[index - 1];
      lessonUrl(lesson.chapter_id, previousLessonId);
    }
  };

  const handlePreviousChapterButton = chapterId => {
    if (isStudent == true) {
      const currentChapterIndex = loadChaptersWithPublishedlessons().findIndex(
        obj => obj.chapter.id == chapterId
      );
      const previousChapterObject = loadChaptersWithPublishedlessons()[
        currentChapterIndex - 1
      ];
      getLessonForPreviousChapter(previousChapterObject);
    } else {
      const currentChapterIndex = getChapterIndex(chapterId);
      const previousChapterObject = chapters[currentChapterIndex - 1];
      if (previousChapterObject.lessons.length > 0) {
        lessonUrl(
          previousChapterObject.chapter.id,
          previousChapterObject.lessons[
            previousChapterObject.lessons.length - 1
          ].id
        );
      }
    }
  };

  const isFirstChapter = chapterId => {
    return getChapterIndex(chapterId) === 0;
  };

  const isLastChapter = chapterId => {
    return getChapterIndex(chapterId) === chapters.length - 1;
  };

  const isLastChapterWithPublishedLessons = chapterId => {
    return (
      loadChaptersWithPublishedlessons().findIndex(
        obj => obj.chapter.id == chapterId
      ) ===
      loadChaptersWithPublishedlessons().length - 1
    );
  };

  const isFirstChapterWithPublishedLessons = chapterId => {
    return (
      loadChaptersWithPublishedlessons().findIndex(
        obj => obj.chapter.id == chapterId
      ) === 0
    );
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
      <div className="p-3 mt-3">
        <p className="text-black text-base leading-normal">
          {lesson.description}
        </p>
      </div>
      <div className="my-3 p-3 flex justify-center items-center">
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

      <div className="flex justify-center mb-0">
        <PreviousButton
          lesson={lesson}
          lessonIds={lessonIds}
          publishedLessonIds={publishedLessonIds}
          isStudent={isStudent}
          handlePreviousButton={handlePreviousButton}
          handlePreviousChapterButton={handlePreviousChapterButton}
          isFirstChapter={isFirstChapter(lesson.chapter_id)}
          isFirstChapterWithPublishedLessons={isFirstChapterWithPublishedLessons(
            lesson.chapter_id
          )}
        />
        <NextButton
          lesson={lesson}
          lessonIds={lessonIds}
          publishedLessonIds={publishedLessonIds}
          isStudent={isStudent}
          handleNextButton={handleNextButton}
          handleNextChapterButton={handleNextChapterButton}
          isLastChapter={isLastChapter(lesson.chapter_id)}
          isLastChapterWithPublishedLessons={isLastChapterWithPublishedLessons(
            lesson.chapter_id
          )}
        />
      </div>
    </div>
  );
}

export default withRouter(Lesson);
