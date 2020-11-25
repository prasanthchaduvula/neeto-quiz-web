import React from "react";
import { Toastr } from "nitroui";
import { withRouter } from "react-router-dom";

function ListCourses({ courses, history }) {
  const NoData = () => {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h4 className="text-xl ">
          We do not have any created or joined courses by you to show here.
          Please add or join courses
        </h4>
      </div>
    );
  };

  return (
    <>
      {courses && courses.length ? (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 my-8">
          {courses.map(({ course, creator }) => (
            <li
              className="col-span-1 bg-white rounded-lg shadow px-5 py-4 cursor-pointer"
              key={course.id}
            >
              <p
                className="mt-1 text-lg font-semibold text-gray-900 truncate hover:text-indigo-600 cursor-pointer"
                onClick={() => {
                  course.isMember
                    ? history.push(`/courses/${course.id}`)
                    : Toastr.error("You are not the member of the course");
                }}
              >
                {course.name}
              </p>
              <div className="flex items-center mt-2">
                <p
                  className="text-sm text-gray-600 hover:text-indigo-600 cursor-pointer"
                  onClick={() => history.push(`/instructors/${creator.id}`)}
                >
                  Instructor: &nbsp;
                  <span>{creator.name}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <NoData />
      )}
    </>
  );
}

export default withRouter(ListCourses);
