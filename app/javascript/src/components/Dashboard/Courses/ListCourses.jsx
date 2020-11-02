import React from "react";
import { Link } from "react-router-dom";

export default function ListCourses({ courses, create }) {
  const NoData = () => {
    return (
      <div className="text-center mt-5 mb-5">
        <h4>
          {create
            ? " We do not have created courses to show here. Please add courses"
            : "We do not have joined courses to show here. Please join courses"}
        </h4>
      </div>
    );
  };

  return (
    <ul>
      {courses && courses.length ? (
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
        })
      ) : (
        <NoData />
      )}
    </ul>
  );
}
