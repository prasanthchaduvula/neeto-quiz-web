import React from "react";
import { Button } from "nitroui";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
export default function SidePanel({
  showPanel,
  setShowPane,
  chapters,
  course,
  getLesson,
  lesson,
  isStudent,
  chaptersWithPublishedLessons,
}) {
  const showDropDown = chapter => {
    return (
      <div key={chapter.chapter.id} className="bg-gray-100">
        <Dropdown
          options={chapter.lessons}
          chapter={chapter.chapter}
          courseId={course.id}
          onOptionSelect={getLesson}
          lesson={lesson}
          isStudent={isStudent}
        />
      </div>
    );
  };
  return showPanel ? (
    <div className="w-auto h-screen ml-0 top-0 left-0 w-9/12 ">
      <div className="flex bg-white justify-between items-center nui-header border-none no-underline">
        <Link to={`/courses/${course.id}`}>
          <Button className=" sm:pr-2 pb-0 text-xl" icon="ri-arrow-left-line" />
        </Link>
        <p className="p-2 text-xl font-semibold">Table Of Contents</p>

        <Button
          onClick={() => {
            setShowPane(false);
          }}
          className=" sm:pr-2 pb-0 text-xl"
          icon="ri-close-line"
        />
      </div>

      {isStudent
        ? chaptersWithPublishedLessons.map(chapter => showDropDown(chapter))
        : chapters.map(chapter => showDropDown(chapter))}
    </div>
  ) : (
    <div className="flex items-start mt-7">
      <Button
        className="p-2 text-xl pb-0"
        onClick={() => {
          setShowPane(true);
        }}
        icon="ri-menu-line"
      />
    </div>
  );
}
