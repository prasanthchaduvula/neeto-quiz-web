import React, { useState } from "react";
import classNames from "classnames";

function Dropdown({ options, onOptionSelect, chapter, lessonId }) {
  const [isActive, setActive] = useState(false);

  const isLessonSelected = lesson_id => {
    return classNames({
      "bg-gray-200": lesson_id == lessonId,
      "bg-white": lesson_id != lessonId,
    });
  };

  return (
    <div className="flex-col lg:p-3 sm:py-3">
      <button onClick={() => setActive(!isActive)}>{chapter.name}</button>
      <div
        className={classNames("mt-2", {
          block: isActive,
          hidden: !isActive,
        })}
      >
        {options.map(option => (
          <div
            key={option.id}
            className={`${isLessonSelected(option.id)} p-3`}
            onClick={() => onOptionSelect(chapter.id, option.id)}
          >
            {option.name}
          </div>
        ))}
      </div>
    </div>
  );
}
export default Dropdown;
