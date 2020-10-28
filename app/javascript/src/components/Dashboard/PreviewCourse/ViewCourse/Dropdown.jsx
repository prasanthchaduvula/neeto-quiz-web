import React, { useState } from "react";
import { Button } from "nitroui";
import classNames from "classnames";
function Dropdown({ options, onOptionSelect, chapter, lessonId }) {
  const [isActive, setActive] = useState(false);

  const isLessonSelected = lesson_id => {
    return classNames({
      "text-blue-800": lesson_id == lessonId,
      "text-dark": lesson_id != lessonId,
    });
  };

  return (
    <div className="flex-col md:p-4 sm:py-3 border-b border-gray-200 w-full shadow-sm">
      <div
        className="flex justify-between"
        onClick={() => setActive(!isActive)}
      >
        <Button
          className="text-gray-800 bg-gray-100 border-none shadow-none text-xl p-2font-semibold"
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
        {options.map(option => (
          <div
            key={option.id}
            style={{ cursor: "pointer" }}
            className={`${isLessonSelected(
              option.id
            )} p-3 bg-white mb-2 rounded-md shadow-sm text-lg`}
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
