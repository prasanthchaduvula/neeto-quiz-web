import React, { useState } from "react";
import { Button, Alert, Toastr } from "neetoui";
import { deleteChapter } from "apis/chapters";
import Lessons from "../Lessons";
import LessonPane from "../Lessons/Pane";
import ChapterPane from "./Pane";

export default function Chapters({ chapters, fetchSingleCourse, course }) {
  const [lessonPane, setLessonPane] = useState(false);
  const [chapterPane, setChapterPane] = useState(false);
  const [chapter, setChapter] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const deleteSingleChapter = () => {
    deleteChapter(course.id, chapter.id).then(() => {
      Toastr.success("Chapter Deleted successfully");
      fetchSingleCourse();
    });
  };

  const ChaptersList = () => {
    return chapters.map(({ chapter, lessons }) => (
      <div key={chapter.id}>
        <div className="w-full border rounded mx-auto my-10 bg-white rounded-lg">
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
                      setShowAlert(true);
                      setChapter(chapter);
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
        <Alert
          isOpen={showAlert}
          title="Delete Chapter"
          message="You are permanently deleting the chapter. This cannot be undone."
          confirmAction={deleteSingleChapter}
          cancelAction={() => setShowAlert(false)}
        />
      </div>
    ));
  };

  const NoChapters = () => {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h4 className="text-xl ">
          We do not have anything to show here. Please add chapters.
        </h4>
      </div>
    );
  };

  return chapters.length ? (
    <>
      <ChaptersList />
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
    <NoChapters />
  );
}
