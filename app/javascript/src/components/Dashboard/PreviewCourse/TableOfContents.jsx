import React, { useEffect, useState } from "react";
import { PageLoader, Button } from "nitroui";
import { Link } from "react-router-dom";
import { PageHeading } from "nitroui/layouts";
import { getCourse } from "apis/courses";
import { showToastr } from "common/index";

function TableOfContents(props) {
  const [course, setCourse] = useState({});
  const [chapters, setChapters] = useState([]);
  const [userName, setUserName] = useState("");
  const [
    chaptersWithPublishedLessons,
    setChaptersWithPublishedLessons,
  ] = useState([]);

  useEffect(() => {
    loadCourseDetails();
  }, []);

  function loadChaptersWithPublishedLessons(chapters) {
    return chapters.filter(chapter => {
      if (chapter.lessons.filter(lesson => lesson.is_published).length > 0) {
        return chapter;
      }
    });
  }

  const fullName = (firstName, lastName) => firstName + " " + lastName;

  const loadCourseDetails = () => {
    getCourse(props.courseId || props.match.params.course_id)
      .then(response => {
        setCourse(response.data.course);
        setChapters(response.data.chapters);
        setChaptersWithPublishedLessons(
          loadChaptersWithPublishedLessons(response.data.chapters)
        );
        setUserName(
          fullName(response.data.user.first_name, response.data.user.last_name)
        );
      })
      .catch(error => {
        showToastr("error", error);
      });
  };

  const showChaptersForStudent = () => {
    return chaptersWithPublishedLessons.map(({ chapter, lessons }, index) => {
      return (
        <div key={chapter.id} className="my-5">
          <h3>
            <div className="flex items-center mb-2">
              <span className="mr-2 text-gray-400 text-lg">{index + 1}</span>
              <span className="text-xl font-normal text-gray-700">
                {chapter.name}
              </span>
            </div>
          </h3>
          <h5>
            {lessons
              .filter(lesson => lesson.is_published)
              .map((lesson, listIndex) => {
                return (
                  <div key={lesson.id} className="ml-2 mb-2">
                    <Link
                      className="text-lg font-normal text-gray-600"
                      to={
                        window.location.pathname +
                        `/student/preview` +
                        `/chapters/${chapter.id}/lessons/${lesson.id}`
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
    });
  };

  const showChaptersForTeacher = () => {
    return chapters.map(({ chapter, lessons }, index) => {
      return (
        <div key={chapter.id} className="my-5">
          <h3>
            <div className="flex items-center mb-2">
              <span className="mr-2 text-gray-400 text-lg">{index + 1}</span>
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
                      window.location.pathname +
                      `/chapters/${chapter.id}/lessons/${lesson.id}`
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
    });
  };

  return (
    <div>
      {course && userName ? (
        <>
          <PageHeading
            title={`${course.name}`}
            breadcrumbLinks={
              props.isStudent ? (
                <Link className="pr-2" to={`/courses`}>
                  <Button
                    icon="ri-arrow-left-line"
                    className="bg-white text-black border-none"
                  />
                </Link>
              ) : (
                <Link className="pr-2" to={`/courses/${course.id}`}>
                  <Button
                    icon="ri-arrow-left-line"
                    className="bg-white text-black border-none"
                  />
                </Link>
              )
            }
          />
          <div className="bg-gray-100 p-3 rounded-md mb-7">
            <p className="text-gray-600 text-base leading-tight leading-5">
              {course.description}
            </p>
            <p className="text-gray-500 text-base leading-tight leading-3">
              <span className="mr-2">by</span>
              {userName}
            </p>
          </div>
          <div className="container ml-4">
            <h2 className="text-xl font-medium mb-2">Table of Contents</h2>
            <hr />

            {props.isStudent
              ? showChaptersForStudent()
              : showChaptersForTeacher()}
          </div>
        </>
      ) : (
        <PageLoader />
      )}
    </div>
  );
}

export default TableOfContents;
