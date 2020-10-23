import React, { useState } from "react";
import { Button } from "nitroui";
import Lessons from "../Lessons/Lessons";
import NewLessonPane from "../Lessons/NewLessonPane";

export default function Chapters({ chapters }) {
  const [showNewLessonPane, setShowNewLessonPane] = useState(false);
  const [chapter, setChapter] = useState({});

  const display = () => {
    return chapters.length ? (
      <>
        {chaptersList()}
        <NewLessonPane
          showPane={showNewLessonPane}
          setShowPane={setShowNewLessonPane}
          chapter={chapter}
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
                  <button>
                    <i className="text-gray-400 mr-3 text-2xl ri-pencil-line hover:text-indigo-500 cursor-pointer"></i>
                  </button>
                </th>
                <th className="py-2">
                  <button>
                    <i className="cursor-pointer text-gray-400 mr-3 text-2xl ri-delete-bin-line hover:text-red-700"></i>
                  </button>
                </th>
              </tr>
            </thead>
            <Lessons lessons={lessons} chapter={chapter} />
          </table>
          <div className="w-40 my-4 ml-4">
            <Button
              type="button"
              label="Add Lesson"
              onClick={() => {
                setShowNewLessonPane(true);
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
