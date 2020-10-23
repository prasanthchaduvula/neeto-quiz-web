import React, { useEffect, useState } from "react";
import CourseApi from "../../../apis/courses";
import ChapterApi from "../../../apis/chapters";
import EditCoursePane from "./EditCoursePane";
import { PageLoader, Button } from "nitroui";
import AddChapterPane from "./Chapters/AddChapterPane";

// import LessonList from "./LessonList";
// import NewLessonPane from "../Lessons/NewLessonPane";
import EditChapterPane from "./Chapters/EditChapterPane";

export default function IndivitualCourse(props) {
  const [course, setCourse] = useState({});
  const [chapters, setChapters] = useState({});
  const [showEditCoursePane, setShowEditCoursePane] = useState(false);
  const [courseEditId] = useState(props.match.params.course_id);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddChapterPane, setShowAddChapterPane] = useState(false);
  // const [showNewLessonPane, setShowNewLessonPane] = useState(false);
  const [chapter, setChapter] = useState({});
  const [showEditChapterPane, setShowEditChapterPane] = useState(false);
  const [editChapterId, setEditChapterId] = useState("");
  // const [chapterDetails, setchapterDetails] = useState({});
  const [chapterIndex, setChapterIndex] = useState("");

  const fetchSingleCourse = () => {
    CourseApi.fetchCourse(props.match.params.course_id).then(response => {
      setCourse(response.data.course.course);
      setChapters(response.data.course.chapters);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchSingleCourse();
  }, [showEditCoursePane]);

  const handleChapterEdit = (id, index) => {
    setShowEditChapterPane(true);
    setEditChapterId(id);
    setChapterIndex(index);
  };

  useEffect(() => {
    if (editChapterId) {
      fetchChapter(props.match.params.course_id, editChapterId);
    }
  }, [editChapterId]);

  const fetchChapter = (courseId, chapterId) => {
    ChapterApi.fetchChapter(courseId, chapterId).then(response =>
      setChapter(response.data.chapter)
    );
  };

  useEffect(() => {
    if (chapter) {
      updateChaptersArrayWithUpdatedChapter(chapter);
    }
  }, [chapter]);

  const updateChaptersArrayWithUpdatedChapter = chapter => {
    if (chapter.id) {
      let updatedChapters = chapters;
      if (updatedChapters[chapterIndex].id == chapter.id) {
        updatedChapters[chapterIndex] = chapter;
      }
      setChapters(updatedChapters);
    }
  };
  return (
    <div className="px-6 pt-4 pb-2">
      {!isLoading ? (
        <>
          <div className="flex-auto flex-row ">
            <div className="inline-flex max-w-xl">
              <div className="px-4 py-8">
                <div className="flex">
                  <h1 className="text-gray-900 text-5xl leading-none mb-4">
                    {course.name}
                  </h1>
                  <span className="inline-block  pl-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    <Button
                      type="button"
                      label="Edit"
                      onClick={() => {
                        setShowEditCoursePane(true);
                      }}
                    />
                  </span>
                  <span className="inline-block  pl-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    <Button
                      type="button"
                      label="Delete"
                      onClick={() => {
                        CourseApi.deleteCourse(
                          props.match.params.course_id
                        ).then(() => (window.location.href = "/courses"));
                      }}
                    />
                  </span>
                  <span className="inline-block  pl-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    <Button
                      onClick={() => setShowAddChapterPane(true)}
                      label="Add new Chapter"
                      icon="ri-add-line"
                    />
                  </span>
                </div>
                <p className="text-gray-600 text-xl leading-tight">
                  {course.description}
                </p>
                <h2 className="my-4 text-gray-900 text-2xl">
                  Table of Contents
                </h2>
                <div>
                  {chapters.map((chapter, index) => {
                    return (
                      <div key={chapter.id}>
                        <h2 className="text-blue-700 text-2xl pb-2">
                          {chapter.name}
                        </h2>
                        <div className="bg-gray-300 flex flex-row-reverse items-center">
                          <span
                            className="px-2"
                            onClick={() => handleChapterEdit(chapter.id, index)}
                          >
                            Edit
                          </span>
                          <span
                            className="px-2"
                            onClick={
                              () => {}
                              // handleChapterDelete(chapter.id, index)
                            }
                          >
                            Delete
                          </span>
                        </div>
                        {/* <LessonList lessons={chapter.lessons} /> */}
                        <Button
                          type="button"
                          label="Add Lesson"
                          onClick={() => {
                            // setShowNewLessonPane(true);
                            setChapter(chapter);
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <EditCoursePane
            showPane={showEditCoursePane}
            setShowPane={setShowEditCoursePane}
            courseId={courseEditId}
            course={course}
            setCourse={setCourse}
          />
          <AddChapterPane
            showPane={showAddChapterPane}
            setShowPane={setShowAddChapterPane}
            courseDetails={course}
            refetch={fetchSingleCourse}
          />
          {/* <NewLessonPane
            showPane={showNewLessonPane}
            setShowPane={setShowNewLessonPane}
            chapter={chapter}
          /> */}
          {editChapterId ? (
            <EditChapterPane
              showPane={showEditChapterPane}
              setShowPane={setShowEditChapterPane}
              chapterDetails={chapter}
              setChapter={setChapter}
            />
          ) : null}
        </>
      ) : (
        <PageLoader />
      )}
    </div>
  );
}
