import React from "react";
import { Button } from "nitroui";

export default function Chapters({ chapters }) {
  const display = () => {
    return chapters.length ? chaptersList() : noResourceMessage();
  };

  const chaptersList = () => {
    return chapters.map(({ chapter }) => {
      return (
        <div
          className="w-full border rounded mx-auto my-6 bg-white rounded-lg"
          key={chapter.id}
        >
          <table className="w-full table-fixed mx-auto mb-4 bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="w-3/4 px-4 py-2 text-left">
                  <p>{chapter.name}</p>
                </th>
                <th className="py-2">
                  <i className="text-gray-400 mr-3 text-2xl ri-pencil-line hover:text-green-700"></i>
                </th>
                <th className="py-2">
                  <i className="cursor-pointer text-gray-400 mr-3 text-2xl ri-delete-bin-line hover:text-red-700"></i>
                </th>
              </tr>
            </thead>
            {/* <LessonsList
              lessons={lessons}
              chapter={chapter}
              courseSlug={courseSlug}
              handleDeleteLesson={handleDeleteLesson}
            /> */}
          </table>
          <div className="w-40 my-4 ml-4">
            <Button type="button" label="Add Lesson" />
          </div>
        </div>
      );
    });
  };

  const noResourceMessage = () => {
    return (
      <div className="text-center mt-5 mb-5">
        {/* <img src={CourseImage} alt="courseImage" className="mx-auto" /> */}
        <h4>
          We do not have anything to show here. Please create new resources.
        </h4>
      </div>
    );
  };

  return <div>{display()}</div>;
}
