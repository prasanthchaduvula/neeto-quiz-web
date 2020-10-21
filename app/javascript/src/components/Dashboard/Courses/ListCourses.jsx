import React from "react";
export default function ListCourses(props) {
  return (
    <div className="bg-gray">
      LIST
      <ul>
        {props.courses.map(course => {
          return (
            <li key={course.id}>
              <div className="p-5 bg-white rounded shadow"></div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
