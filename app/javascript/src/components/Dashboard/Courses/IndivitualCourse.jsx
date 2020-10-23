import React, { useEffect, useState } from "react";
import CourseApi from "../../../apis/courses";
import ChapterApi from "../../../apis/chapters";
import EditCoursePane from "./EditCoursePane";
import { PageLoader, Button } from "nitroui";
import { PageHeading } from "nitroui/layouts";
import AddChapterPane from "./Chapters/AddChapterPane";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import EditChapterPane from "./Chapters/EditChapterPane";

export default function IndivitualCourse(props) {
  const [courseDetails, setCourseDetails] = useState({});
  const [showEditCoursePane, setShowEditCoursePane] = useState(false);
  const [showAddChapterPane, setShowAddChapterPane] = useState(false);
  const [showEditChapterPane, setShowEditChapterPane] = useState(false);
  const [courseEditId] = useState(props.match.params.course_id);
  const [isLoading, setIsLoading] = useState(true);
  const [editChapterId, setEditChapterId] = useState("");
  const [chapterDetails, setchapterDetails] = useState({});
  const [chapterIndex, setChapterIndex] = useState("");

  //fetching single course
  const fetchSingleCourse = () => {
    CourseApi.fetchCourse(props.match.params.course_id).then(response => {
      setCourseDetails(response.data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchSingleCourse();
  }, [showEditCoursePane]);

  // handle click on edit button of chapter
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
      setchapterDetails(response.data)
    );
  };

  useEffect(() => {
    if (chapterDetails.chapter) {
      updateCourseDetailsWithUpdatedChapter(chapterDetails);
    }
  }, [chapterDetails]);

  const updateCourseDetailsWithUpdatedChapter = chapterDetails => {
    if (chapterDetails.chapter) {
      let updatedChapters = courseDetails.chapters;
      if (updatedChapters[chapterIndex].id == chapterDetails.chapter.id) {
        updatedChapters[chapterIndex] = chapterDetails.chapter;
      }
      setCourseDetails({ ...courseDetails, chapters: updatedChapters });
    }
  };

  const handleChapterDelete = chapterId => {
    ChapterApi.deleteChapter(props.match.params.course_id, chapterId).then(
      () => {
        setIsLoading(true);
        fetchSingleCourse();
      }
    );
  };

  return (
    <div>
      <PageHeading
        title="Chapters"
        rightButton={() => (
          <Button
            onClick={() => setShowAddChapterPane(true)}
            label="Add new Chapter"
            icon="ri-add-line"
          />
        )}
      />
      {!isLoading ? (
        <>
          <div className="flex-auto flex-row ">
            <div className="inline-flex max-w-screen-xl">
              <div className="px-3 py-8">
                <div className="flex justify-between">
                  <h1 className="text-gray-900 text-3xl font-bold leading-none mb-4">
                    {courseDetails.course.name}
                  </h1>
                  <div className="flex">
                    <span className="inline-block  pl-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                      <Button
                        type="button"
                        label="Edit"
                        onClick={() => {
                          setShowEditCoursePane(true);
                        }}
                      />
                    </span>
                    <span className="inline-block  pl-2 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
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
                  </div>
                </div>
                <p className="text-gray-600 text-xl leading-tight">
                  {courseDetails.course.description}
                </p>
                <h2 className="my-4 text-gray-900 text-2xl">
                  Table of Contents
                </h2>
                <div>
                  {courseDetails.chapters.map((chapter, index) => {
                    return (
                      <div
                        key={chapter.id}
                        className="max-w-sm rounded shadow-lg mb-2"
                      >
                        <div className="border-r border-b border-l border-gray-400 pb-2 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                          <div className="mb-8">
                            <div className="bg-gray-300 flex flex-row-reverse items-center">
                              <span
                                className="px-2"
                                onClick={() =>
                                  handleChapterEdit(chapter.id, index)
                                }
                              >
                                Edit
                              </span>
                              <span
                                className="px-2"
                                onClick={() =>
                                  handleChapterDelete(chapter.id, index)
                                }
                              >
                                Delete
                              </span>
                            </div>
                            <div className="text-gray-500 font-bold text-xl mb-2">
                              <Link
                                to={`/courses/${courseDetails.course.id}/chapters/${chapter.id}`}
                              >
                                {chapter.name}
                              </Link>
                            </div>
                            <Button
                              label="Add Lesson"
                              size="large"
                              type="secondary"
                              onClick={() =>
                                (window.location.href = `/courses/${courseDetails.course.id}/chapters/${chapter.id}`)
                              }
                            />
                          </div>
                        </div>
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
            courseDetails={courseDetails}
            setCourse={setCourseDetails}
          />
          <AddChapterPane
            showPane={showAddChapterPane}
            setShowPane={setShowAddChapterPane}
            courseDetails={courseDetails}
            refetch={fetchSingleCourse}
          />
          {editChapterId ? (
            <EditChapterPane
              showPane={showEditChapterPane}
              setShowPane={setShowEditChapterPane}
              chapterDetails={chapterDetails}
              setChapter={setchapterDetails}
            />
          ) : null}
        </>
      ) : (
        <PageLoader />
      )}
    </div>
  );
}
