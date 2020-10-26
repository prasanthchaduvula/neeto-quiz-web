import React, { useState } from "react";
import { Button } from "nitroui";
import LessonPane from "./Pane";

export default function Lessons({ lessons, chapter, fetchSingleCourse }) {
  const [lessonPane, setLessonPane] = useState(false);
  const [lesson, setLesson] = useState({});

  const showDraftStatus = isPublished => {
    return !isPublished ? (
      <span className="inline-flex items-center px-2 py-1 rounded-md text-sm font-medium leading-5 bg-gray-100 text-gray-400">
        Draft
      </span>
    ) : (
      ""
    );
  };

  return (
    <>
      <tbody>
        {lessons.map(lesson => {
          return (
            <tr
              className="w-full hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
              key={lesson.id}
            >
              <td className="w-3/4 border-t border-b px-4 py-2">
                <div className="flex space-x-2">
                  <p
                    className="hover:text-blue-600 hover:underline text-base font-medium  cursor-pointer"
                    onClick={() => {
                      setLessonPane(true);
                      setLesson(lesson);
                    }}
                  >
                    {lesson.name}
                  </p>
                  <div>{showDraftStatus(lesson.isPublished)}</div>
                </div>
              </td>
              <td className="text-center border-t border-b py-2">
                <Button
                  style="icon"
                  icon="ri-toggle-line"
                  className="hover:text-indigo-500"
                />
              </td>
              <td className="flex justify-center items-center border-t py-2">
                <Button
                  style="icon"
                  icon="ri-delete-bin-line"
                  className="hover:text-red-500"
                />
              </td>
            </tr>
          );
        })}
      </tbody>
      <LessonPane
        showPane={lessonPane}
        setShowPane={setLessonPane}
        isCreateForm={false}
        chapter={chapter}
        lesson={lesson}
        fetchSingleCourse={fetchSingleCourse}
      />
    </>
  );
}
