import React from "react";
import { Link } from "react-router-dom";
import JoinedCourses from "./JoinedCourses";

export default function ListCourses(props) {
  return (
    <div className="bg-gray">
      <ul>
        <h3 className="m-2 font-lg font-semibold">Created Courses</h3>
        {props.courses &&
          props.courses.map(course => {
            return (
              <li key={course.id}>
                <div className="max-w-sm rounded overflow-hidden shadow-lg">
                  <div className="px-6 py-4">
                    <div className="text-xl mb-2">
                      <Link to={`/courses/${course.id}`}>{course.name}</Link>{" "}
                    </div>
                    <p className="text-gray-700 text-base">
                      {course.description}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}

        <JoinedCourses joinedCourses={props.joinedCourses} />
      </ul>
    </div>
  );
}
