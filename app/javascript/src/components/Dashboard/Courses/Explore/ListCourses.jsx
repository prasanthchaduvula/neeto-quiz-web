import React, { useState } from "react";
import { Badge } from "nitroui";
import { withRouter } from "react-router-dom";
import ExplorCoursePane from "./Pane";

function ListCourses({ courses, history }) {
  const [exploreCoursePane, setExploreCoursePane] = useState(false);
  const [course, setCourse] = useState({});
  const [chapters, setChapters] = useState([]);

  const NoData = () => {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h4 className="text-xl ">We do not have any courses to show here.</h4>
      </div>
    );
  };

  return (
    <>
      {courses && courses.length ? (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 my-6">
          {courses.map(({ course, creator, chapters }) => (
            <li
              className="col-span-1 bg-white rounded-lg shadow px-5 py-4 cursor-pointer hover:bg-gray-100"
              key={course.id}
              onClick={() => {
                course.isMember
                  ? history.push(`/courses/${course.id}`)
                  : setCourse(course);
                setChapters(chapters);
                setExploreCoursePane(true);
              }}
            >
              <p className="mt-1 text-lg font-semibold text-gray-900 truncate">
                {course.name}
              </p>
              <div className="flex items-center mt-2">
                <p className="text-sm text-gray-600">
                  Instructor: &nbsp;
                  <span>{creator.name}</span>
                </p>
                <Badge
                  color={course.price ? "yellow" : "green"}
                  className="ml-4 text-sm"
                >
                  {course.price ? `Rs ${course.price}` : "Free"}
                </Badge>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <NoData />
      )}
      <ExplorCoursePane
        showPane={exploreCoursePane}
        setShowPane={setExploreCoursePane}
        course={course}
        chapters={chapters}
      />
    </>
  );
}

export default withRouter(ListCourses);
