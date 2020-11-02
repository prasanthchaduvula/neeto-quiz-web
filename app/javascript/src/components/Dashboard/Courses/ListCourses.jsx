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
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul>
        {courses && courses.length ? (
          courses.map(course => {
            return (
              <li key={course.id} className="border-t border-gray-200">
                <Link
                  to={`/courses/${course.id}`}
                  className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out no-underline"
                >
                  <div className="px-4 py-4 sm:px-6">
                    <div className="min-w-0 ">
                      <div>
                        <div className="leading-5 font-medium text-indigo-600 truncate text-base">
                          {course.name}
                        </div>
                        <div className="mt-2">
                          <div className="text-sm leading-5 text-gray-500">
                            <span>{course.description}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })
        ) : (
          <NoData />
        )}
      </ul>
    </div>
  );
}
