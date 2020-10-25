import React, { useState } from "react";
import { Button } from "nitroui";
import Lessons from "../Lessons";
import AddLessonPane from "../Lessons/Pane/Add";

export default function Chapters({ chapters, fetchSingleCourse }) {
  const [newLessonPane, setNewLessonPane] = useState(false);
  const [chapter, setChapter] = useState({});

  const display = () => {
    return chapters.length ? (
      <>
        {chaptersList()}
        <AddLessonPane
          showPane={newLessonPane}
          setShowPane={setNewLessonPane}
          chapter={chapter}
          fetchSingleCourse={fetchSingleCourse}
        />
      </>
    ) : (
      noResourceMessage()
    );
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
              <tr>
                <th className="w-3/4 px-4 py-2 text-left">
                  <p className="text-base">{chapter.name}</p>
                </th>
                <th className="py-2">
                  <Button
                    style="icon"
                    icon="ri-pencil-line"
                    className="hover:text-indigo-500"
                  />
                </th>
                <th className="py-2">
                  <button>
                    <i className="cursor-pointer text-gray-400 mr-3 text-2xl ri-delete-bin-line hover:text-red-700"></i>
                  </button>
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
                setNewLessonPane(true);
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
