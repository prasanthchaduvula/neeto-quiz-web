import React, { useEffect, useState } from "react";
import { PageLoader, Toastr } from "neetoui";
import { withRouter } from "react-router-dom";
import { getCourse } from "apis/courses";

function CourseTemplate(props) {
  const [course, setCourse] = useState({});
  const [chapters, setChapters] = useState([]);
  const [creator, setCreator] = useState({});

  useEffect(() => {
    loadCourseDetails();
  }, []);

  const loadCourseDetails = () => {
    getCourse(props.courseId || props.match.params.course_id)
      .then(response => {
        setCourse(response.data.course);
        setChapters(response.data.chapters);
        setCreator(response.data.creator);
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
                chapters={chapters}
                course={course}
                history={props.history}
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

const ShowChapters = ({ chapters, course, history }) => {
  return (
    <>
      {chapters.map(({ chapter, lessons }, index) => {
        return (
          <div key={chapter.id} className="my-5">
            <div className="flex items-center mb-4">
              <span className="mr-2 text-xl text-gray-500 text-normal">
                {index + 1}
              </span>
              <h3 className="text-xl font-semibold text-gray-900">
                {chapter.name}
              </h3>
            </div>
            {lessons &&
              lessons.map((lesson, listIndex) => (
                <div
                  key={lesson.id}
                  className="ml-2 mb-2 cursor-pointer text-gray-900 hover:text-blue-600 text-lg font-medium"
                  onClick={() => {
                    history.push(
                      `/courses/${course.id}/chapters/${chapter.id}/lessons/${lesson.id}`
                    );
                  }}
                >
                  <div className="w-6 mr-4 inline-block md:w-10 md:mr-2">
                    <span className="text-gray-500 text-base  md:text-lg">
                      {`${index + 1}.${listIndex + 1}`}
                    </span>
                  </div>
                  <span>{lesson.name}</span>
                </div>
              ))}
          </div>
        );
      })}
    </>
  );
};

export default withRouter(CourseTemplate);
