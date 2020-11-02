import React from "react";
import { Link } from "react-router-dom";

export default function JoinedCourses(props) {
  return (
    <div>
      <h3 className="m-2 font-lg font-semibold">Joined Courses</h3>
      {props.joinedCourses &&
        props.joinedCourses.map(course => {
          return (
            <li key={course.id}>
              <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <div className="px-6 py-4">
                  <div className="text-xl mb-2">
                    <Link to={`/courses/${course.id}`}>{course.name}</Link>
                  </div>
                  <p className="text-gray-700 text-base">
                    {course.description}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
    </div>
  );
}
