import React, { useEffect, useState } from "react";
import { Button } from "nitroui";
import classNames from "classnames";

function Dropdown({ options, onOptionSelect, chapter, lesson, isStudent }) {
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
      "text-blue-800": lesson_id == lesson.id,
      "text-dark": lesson_id != lesson.id,
    });
  };

  const isChapterSelected = chapter_id => {
    return classNames({
      "font-semibold": chapter_id == lesson.chapter_id,
      "font-normal": chapter_id != lesson.chapter_id,
    });
  };

  const showOption = (chapterId, lesson) => {
    return (
      <div
        key={lesson.id}
        style={{ cursor: "pointer" }}
        className={`${isLessonSelected(
          lesson.id
        )} p-3 bg-white mb-2 rounded-md shadow-sm text-lg`}
        onClick={() => onOptionSelect(chapterId, lesson.id)}
      >
        {lesson.name}
      </div>
    );
  };

  return (
    <div className="flex-col md:p-4 sm:py-3 border-b border-gray-200 w-full shadow-sm">
      <div
        className="flex justify-between"
        onClick={() => setActive(!isActive)}
      >
        <Button
          className={`text-gray-800 bg-gray-100 border-none shadow-none text-xl p-2font-semibold ${isChapterSelected(
            chapter.id
          )}`}
          onClick={() => setActive(!isActive)}
          label={chapter.name}
        />
        <Button
          className="text-gray-800 bg-gray-100 border-none shadow-none text-xl p-2"
          icon="ri-arrow-down-s-line"
        />
      </div>
      <div
        className={classNames("mt-2", {
          block: isActive,
          hidden: !isActive,
        })}
      >
        {!isStudent
          ? options.map(lesson => showOption(chapter.id, lesson))
          : options
              .filter(option => option.is_published)
              .map(lesson => showOption(chapter.id, lesson))}
      </div>
    </div>
  );
}
export default Dropdown;
