import React from "react";
import { Button } from "nitroui";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";

export default function SidePanel({
  showPanel,
  setSidepanel,
  chapters,
  course,
  getLesson,
  lessonId,
}) {
  return showPanel ? (
    <div className="w-auto h-screen">
      <div className="flex bg-white justify-between items-center nui-header border-none">
        <Link to={`/courses/${course.id}`}>
          <button className="md:p-2 sm:pr-2 pb-0 text-xl">
            <i className="ri-arrow-left-line"></i>
          </button>
        </Link>
        <p className="p-2">Table Of Contents</p>
        <button
          className="p-2 text-xl pb-0"
          onClick={() => {
            setSidepanel(false);
          }}
        >
          <i className="ri-menu-line"></i>
        </button>
      </div>

      {chapters.map(chapter => {
        return (
          <Dropdown
            key={chapter.chapter.id}
            options={chapter.lessons}
            chapter={chapter.chapter}
            courseId={course.id}
            onOptionSelect={getLesson}
            lessonId={lessonId}
          />
        );
      })}
    </div>
  ) : (
    <div className="flex items-start mt-7">
      <Button
        className="p-2 text-xl pb-0"
        onClick={() => {
          setSidepanel(true);
        }}
        icon="ri-menu-line"
      />
    </div>
  );
}
