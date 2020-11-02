import React from "react";
import { Link } from "react-router-dom";

export default function CreatedCourses({ courses }) {
  return (
    <ul>
      {courses &&
        courses.map(course => {
          return (
            <li
              className="max-w-6xl course-card px-6 py-4 shadow-md"
              key={course.id}
            >
              <Link to={`/courses/${course.id}`} className="no-underline">
                <p className="text-xl mb-2">{course.name}</p>
                <p className="text-gray-500 text-base leading-normal">
                  {course.description}
                </p>
              </Link>
            </li>
          );
        })}
    </ul>
  );
}
