import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

export default function Lessons({ lessons }) {
  const showDraftStatus = isPublished => {
    return !isPublished ? (
      <span className="inline-flex items-center px-2 py-1 rounded-md text-sm font-medium leading-5 bg-gray-100 text-gray-400">
        Draft
      </span>
    ) : (
      ""
    );
  };

  const publishStatusClass = isPublished => {
    return classNames({
      "bg-green-600": isPublished,
      "bg-gray-200": !isPublished,
    });
  };

  const isOn = isPublished => {
    return classNames({
      "translate-x-3": isPublished,
      "translate-x-0": !isPublished,
    });
  };

  const handleStatus = isPublished => {
    return isPublished ? "Published" : "Unpublished";
  };

  return (
    <tbody>
      {lessons.map(lesson => {
        return (
          <tr
            className="w-full hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
            key={lesson.id}
          >
            <td className="w-3/4 border-t border-b px-4 py-2">
              <div className="flex space-x-2">
                <Link
                  className="hover:text-blue-600 text-base font-medium"
                  to=""
                >
                  {lesson.name}
                </Link>
                <div>{showDraftStatus(lesson.isPublished)}</div>
              </div>
            </td>
            <td className="text-center border-t border-b py-2 px-2 tooltip">
              <span
                aria-label={handleStatus(lesson.isPublished)}
                data-balloon-pos="left"
                role="checkbox"
                tabIndex="0"
                aria-checked="false"
                className={`${publishStatusClass(
                  lesson.isPublished
                )} relative inline-flex flex-shrink-0 h-4 w-7 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:shadow-outline`}
              >
                <span
                  aria-hidden="true"
                  className={`${isOn(
                    lesson.isPublished
                  )} inline-block h-3 w-3 rounded-full bg-white shadow transform transition ease-in-out duration-200`}
                ></span>
              </span>
            </td>
            <td className="text-center border-t border-b py-2">
              <i className="cursor-pointer text-gray-400 mr-3 text-2xl ri-delete-bin-line hover:text-red-600"></i>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}
