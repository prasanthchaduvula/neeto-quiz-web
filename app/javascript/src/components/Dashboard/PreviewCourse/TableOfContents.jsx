import React, { useEffect, useState } from "react";
import { PageLoader } from "nitroui";
import { Link } from "react-router-dom";
import { PageHeading } from "nitroui/layouts";
import CourseApi from "apis/courses";
import Axios from "axios";

function TableOfContents(props) {
  const [course, setCourse] = useState({});
  const [chapters, setChapters] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    loadCourse();
  }, []);

  const fullName = (firstName, lastName) => firstName + " " + lastName;
  const loadCourse = () => {
    CourseApi.fetchCourse(props.match.params.course_id).then(response => {
      Axios.get(`/api/v1/users/${response.data.course.user_id}`).then(res => {
        setUserName(
          fullName(res.data.user.first_name, res.data.user.last_name)
        );
        setCourse(response.data.course);
        setChapters(response.data.chapters);
      });
    });
  };
  return (
    <div>
      {course && userName ? (
        <>
          <PageHeading title={`${course.name}`} />
          <div className="bg-gray-100 p-3 rounded-md mb-7">
            <p className="text-gray-600 text-base leading-tight leading-5">
              {course.description}
            </p>
            <p className="text-gray-500 text-base leading-tight leading-3">
              <span className="mr-2">by</span>
              {userName}
            </p>
          </div>
          <div className="container">
            <h2 className="text-xl font-medium mb-5">Table of Contents</h2>

            {chapters.map(({ chapter, lessons }, index) => {
              return (
                <div key={chapter.id} className="mb-5">
                  <h3>
                    <div className="flex items-center mb-2">
                      <span className="mr-2 text-gray-400 text-lg">
                        {index + 1}
                      </span>
                      <span className="text-xl font-normal text-gray-700">
                        {chapter.name}
                      </span>
                    </div>
                  </h3>
                  <h5>
                    {lessons.map((lesson, listIndex) => {
                      return (
                        <div key={lesson.id} className="ml-2 mb-2">
                          <Link
                            className="text-lg font-normal text-gray-600"
                            to={
                              window.location.pathname + `/lessons/${lesson.id}`
                            }
                          >
                            <span className="text-gray-400 text-normal">
                              {index + 1}.
                            </span>
                            <span className="mr-3 text-gray-400 text-normal">
                              {listIndex + 1}
                            </span>
                            {lesson.name}
                          </Link>
                        </div>
                      );
                    })}
                  </h5>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <PageLoader />
      )}
    </div>
  );
}
export default TableOfContents;
