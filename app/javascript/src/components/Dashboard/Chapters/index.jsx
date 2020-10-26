import React, { useState } from "react";
import { Button } from "nitroui";
import Lessons from "../Lessons";
import ChapterPane from "./Pane";
import { deleteChapter } from "apis/chapters";
import { showToastr } from "common";
import LessonPane from "../Lessons/Pane";

export default function Chapters({ chapters, fetchSingleCourse, course }) {
  const [lessonPane, setLessonPane] = useState(false);
  const [chapterPane, setChapterPane] = useState(false);
  const [chapter, setChapter] = useState({});

  const display = () => {
    return chapters.length ? (
      <>
        {chaptersList()}
        <LessonPane
          showPane={lessonPane}
          setShowPane={setLessonPane}
          isCreateForm={true}
          chapter={chapter}
          lesson=""
          fetchSingleCourse={fetchSingleCourse}
        />
        <ChapterPane
          showPane={chapterPane}
          setShowPane={setChapterPane}
          isCreateForm={false}
          chapter={chapter}
          course={course}
          fetchSingleCourse={fetchSingleCourse}
        />
      </>
    ) : (
      noResourceMessage()
    );
  };

  const deleteSingleChapter = chapterId => {
    deleteChapter(course.id, chapterId).then(() => {
      showToastr("success", "Deleted successfully");
      fetchSingleCourse();
    });
  };
  const chaptersList = () => {
    return chapters.map(({ chapter, lessons }) => {
      return (
        <div
          className="w-full border rounded mx-auto my-10 bg-white rounded-lg"
          key={chapter.id}
        >
          <table className="w-full table-fixed mx-auto mb-4 bg-white">
            <thead className="bg-gray-100">
              <tr className="w-full hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out border-t border-b">
                <th className="w-3/4 px-4 py-2t">
                  <div className="flex space-x-2">
                    <p className="text-base">{chapter.name}</p>
                  </div>
                </th>
                <th className="flex justify-end items-center py-2 mr-4">
                  <Button
                    style="icon"
                    icon="ri-pencil-line"
                    className="hover:text-indigo-500 mr-6"
                    onClick={() => {
                      setChapterPane(true);
                      setChapter(chapter);
                    }}
                  />
                  <Button
                    style="icon"
                    icon="ri-delete-bin-line"
                    className="hover:text-red-500"
                    onClick={() => {
                      deleteSingleChapter(chapter.id);
                    }}
                  />
                </th>
              </tr>
            </thead>
            <Lessons
              lessons={lessons}
              chapter={chapter}
              fetchSingleCourse={fetchSingleCourse}
            />
          </table>
          <div className="w-40 my-4 ml-4">
            <Button
              type="button"
              label="Add Lesson"
              onClick={() => {
                setLessonPane(true);
                setChapter(chapter);
              }}
            />
          </div>
        </div>
      );
    });
  };

  const noResourceMessage = () => {
    return (
      <div className="text-center mt-5 mb-5">
        <h4>
          We do not have anything to show here. Please create new resources.
        </h4>
      </div>
    );
  };

  return <div className="mt-15">{display()}</div>;
}
