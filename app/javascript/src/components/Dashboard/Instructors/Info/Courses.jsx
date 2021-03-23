import React from "react";
import { withRouter } from "react-router";
import { Button } from "neetoui";

function Courses({ courses, setPaneMode, setPaneTitle, history }) {
  const CourseBlock = ({ name, id }) => {
    return (
      <p
        className="mt-6 bg-white rounded-lg shadow px-5 py-4 text-base font-normal text-black truncate hover:text-indigo-600 hover:font-semibold cursor-pointer"
        onClick={() => history.push(`/courses/${id}`)}
      >
        {name}
      </p>
    );
  };

  return (
    <div>
      <div className="mt-4 pb-20">
        {courses && courses.length ? (
          courses.map(({ course }) => (
            <CourseBlock key={course.id} name={course.name} id={course.id} />
          ))
        ) : (
          <p className="text-center mt-20 text-base font-normal text-gray-900 truncate ">
            No courses for this instructor
          </p>
        )}
      </div>
      <div className="absolute bottom-0 left-0 w-full bg-white nui-pane--footer">
        <Button
          label="Access To Unjoined Courses"
          icon="ri-book-open-line"
          size="large"
          style="secondary"
          onClick={() => {
            setPaneMode("unjoined courses");
            setPaneTitle("Access To Unjoined Courses");
          }}
        />
      </div>
    </div>
  );
}

export default withRouter(Courses);
