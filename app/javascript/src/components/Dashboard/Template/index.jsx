import React, { useEffect, useState } from "react";
import { PageLoader, Toastr } from "neetoui";
import { Link } from "react-router-dom";
import { getCourse } from "apis/courses";

function CourseTemplate(props) {
  const [course, setCourse] = useState({});
  const [chapters, setChapters] = useState([]);
  const [creator, setCreator] = useState({});
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

  const loadCourseDetails = () => {
    getCourse(props.courseId || props.match.params.course_id)
      .then(response => {
        setCourse(response.data.course);
        setChapters(response.data.chapters);
        setCreator(response.data.creator);
        setChaptersWithPublishedLessons(
          loadChaptersWithPublishedLessons(response.data.chapters)
        );
      })
      .catch(error => {
        Toastr.error(error);
      });
  };

  return (
    <div>
      {course ? (
        <>
          <div className="w-full bg-purple-500 mb-12">
            <div className="max-w-5xl m-auto flex items-center h-64 ">
              <div>
                <p className="text-white leading-tight font-semibold text-3xl">
                  {course.name}
                </p>
                <p className="text-white text-base leading-tight mt-8">
                  {course.description}
                </p>
                <p className="text-white text-base mt-4">{`Teacher: ${creator.name}`}</p>
              </div>
            </div>
          </div>
          <div className="max-w-5xl m-auto">
            <div>
              <h2 className="text-2xl text-black font-semibold leading-tight pb-2">
                Table of Contents
              </h2>
              <hr />
              <ShowChapters
                chapters={
                  props.isStudent ? chaptersWithPublishedLessons : chapters
                }
                course={course}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="min-h-screen flex items-center">
          <PageLoader />
        </div>
      )}
    </div>
  );
}

const ShowChapters = ({ chapters, course }) => {
  return (
    <>
      {chapters.map(({ chapter, lessons }, index) => (
        <div key={chapter.id} className="my-5">
          <div className="flex items-center mb-4">
            <span className="mr-2 text-xl text-gray-500 text-normal">
              {index + 1}
            </span>
            <h3 className="text-xl font-semibold text-gray-900">
              {chapter.name}
            </h3>
          </div>
          {lessons.map((lesson, listIndex) => (
            <div key={lesson.id} className="ml-2 mb-2">
              <Link
                className="text-lg font-medium text-gray-900 hover:text-blue-600 no-underline"
                to={`/courses/${course.id}/chapters/${chapter.id}/lessons/${lesson.id}`}
              >
                <div className="w-6 mr-4 inline-block md:w-10 md:mr-2">
                  <span className="text-gray-500 text-base md:text-lg">
                    {`${index + 1}.${listIndex + 1}`}
                  </span>
                </div>
                <span>{lesson.name}</span>
              </Link>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default CourseTemplate;
