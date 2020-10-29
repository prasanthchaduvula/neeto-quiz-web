import React, { useState } from "react";
import { Button } from "nitroui";
import { showToastr } from "common/index";
import { updateLesson, deleteLesson } from "apis/lessons";
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

  const publishLesson = lesson => {
    const formData = new FormData();
    formData.append("lesson[is_published]", !lesson.is_published);

    updateLesson(chapter.id, formData, lesson.id).then(response => {
      showToastr(
        "success",
        `Lesson ${
          response.data.lesson.is_published ? "Published" : "Unpublished"
        } successfully`
      );
      fetchSingleCourse();
    });
  };

  const deleteSingleLesson = lesson => {
    deleteLesson(chapter.id, lesson.id).then(() => {
      showToastr("success", "Lesson Deleted Successfully");
      fetchSingleCourse();
    });
  };
  return (
    <>
      <tbody>
        {lessons.map(lesson => {
          return (
            <tr
              className="w-full hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out border-t border-b"
              key={lesson.id}
            >
              <td className="w-3/4  px-4 py-2">
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
                  <div>{showDraftStatus(lesson.is_published)}</div>
                </div>
              </td>
              <td className="flex justify-end items-center py-2 mr-4">
                <Button
                  style="icon"
                  icon={
                    lesson.is_published ? "ri-toggle-fill" : "ri-toggle-line"
                  }
                  className="hover:text-indigo-500 mr-6 text-indigo-500"
                  onClick={() => publishLesson(lesson)}
                />
                <Button
                  style="icon"
                  icon="ri-delete-bin-line"
                  className="hover:text-red-500"
                  onClick={() => deleteSingleLesson(lesson)}
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
