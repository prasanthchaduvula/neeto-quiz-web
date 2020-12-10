import React, { useEffect, useState } from "react";
import { Button } from "neetoui";
import classNames from "classnames";
import { Link } from "react-router-dom";

function TableOfContents({
  course,
  chapter,
  lessons,
  onLessonSelect,
  lesson,
  onClose,
}) {
  const [isActive, setActive] = useState(true);

  useEffect(() => {
    if (chapter.id == lesson.chapter_id) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [lesson.chapter_id]);

  const isLessonSelected = lesson_id => {
    return classNames({
      "text-blue-700 font-semibold": lesson_id == lesson.id,
      "text-dark": lesson_id != lesson.id,
    });
  };

  const showLessons = lesson => {
    return (
      <Link
        to={`/courses/${course.id}/chapters/${chapter.id}/lessons/${lesson.id}`}
        key={lesson.id}
      >
        <div
          key={lesson.id}
          style={{ cursor: "pointer" }}
          className={`${isLessonSelected(
            lesson.id
          )} p-3 text-gray-900 font-medium text-base`}
          onClick={() => {
            onLessonSelect(chapter.id, lesson.id);
            onClose();
          }}
        >
          {lesson.name}
        </div>
      </Link>
    );
  };

  return (
    <section
      className={classNames(
        "border-gray-200 bg-white mb-6 rounded-lg shadow-sm"
      )}
    >
      <div
        className={classNames(
          "flex justify-between items-center p-3 sidebar-chapter-title cursor-pointer group",
          { "border-b border-gray-100": isActive }
        )}
        onClick={() => setActive(!isActive)}
      >
        <div
          className={`flex items-center text-base text-gray-900 group-hover:text-blue-700`}
        >
          <h4 className={`text-base font-semibold text-lg tracking-normal `}>
            {chapter.name}
          </h4>
          <span className="p-2 py-1 ml-2 text-xs leading-none text-gray-700 bg-gray-100 bg-opacity-75 rounded-lg">
            {lessons.length} lessons
          </span>
        </div>
        <Button
          className={classNames(
            "text-2xl font-normal text-gray-500  transform duration-100 ease-linear group-hover:text-blue-700 group-hover:scale-125 bg-transparent border-none shadow-none",
            {
              "rotate-0": !isActive,
              "rotate-180 group-hover:scale-125": isActive,
            }
          )}
          icon="ri-arrow-down-s-line"
        />
      </div>

      <div
        className={classNames("mt-2", {
          block: isActive,
          hidden: !isActive,
        })}
      >
        {lessons.map(lesson => showLessons(lesson))}
      </div>
    </section>
  );
}

export default TableOfContents;
