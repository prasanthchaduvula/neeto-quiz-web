import React from "react";
import { Button } from "nitroui";
import CourseApi from "../../../apis/courses";

export default function ListCourses(props) {
  return (
    <div className="bg-gray">
      <ul>
        {props.courses.map(course => {
          return (
            <li key={course.id}>
              <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <div className="px-6 py-4">
                  <div className="text-xl mb-2">{course.name}</div>
                  <p className="text-gray-700 text-base">
                    {course.description}
                  </p>
                </div>
                <div className="px-6 pt-4 pb-2">
                  <span className="inline-block  px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    <Button
                      type="button"
                      label="Edit"
                      onClick={() => {
                        props.setCourseId(course.id);
                        props.setShowEditPane(true);
                      }}
                    />
                  </span>
                  <span className="inline-block  px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    <Button
                      type="button"
                      label="Delete"
                      onClick={() => {
                        CourseApi.deleteCourse(course.id).then(() =>
                          props.refetch()
                        );
                      }}
                    />
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
