import React, { useEffect, useState } from "react";
import CourseApi from "../../../apis/courses";
import EditCoursePane from "./EditCoursePane";
import { PageLoader, Button } from "nitroui";

export default function Course(props) {
  const [course, setCourse] = useState({});
  const [chapters, setChapters] = useState({});
  const [showEditCoursePane, setShowEditCoursePane] = useState(false);
  const [courseEditId] = useState(props.match.params.course_id);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSingleCourse();
  }, [showEditCoursePane]);

  const fetchSingleCourse = () => {
    CourseApi.fetchCourse(props.match.params.course_id).then(response => {
      setCourse(response.data.course.course);
      setChapters(response.data.course.chapters);
      setIsLoading(false);
    });
  };

  return (
    <div className="px-6 pt-4 pb-2">
      {!isLoading ? (
        <>
          <div className="flex-auto flex-row ">
            <div className="inline-flex max-w-xl">
              <div className="px-4 py-8">
                <div className="flex">
                  <h1 className="text-gray-900 text-5xl leading-none mb-4">
                    {course.name}
                  </h1>
                  <span className="inline-block  pl-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    <Button
                      type="button"
                      label="Edit"
                      onClick={() => {
                        setShowEditCoursePane(true);
                      }}
                    />
                  </span>
                  <span className="inline-block  pl-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    <Button
                      type="button"
                      label="Delete"
                      onClick={() => {
                        CourseApi.deleteCourse(
                          props.match.params.course_id
                        ).then(() => (window.location.href = "/courses"));
                      }}
                    />
                  </span>
                </div>
                <p className="text-gray-600 text-xl leading-tight">
                  {course.description}
                </p>
                <h2 className="my-4 text-gray-900 text-2xl">
                  Table of Contents
                </h2>
                <div>
                  {chapters.map((chapter, index) => (
                    <div key={index}>
                      <h2 className="text-blue-700 text-2xl pb-2">hello</h2>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <EditCoursePane
            showPane={showEditCoursePane}
            setShowPane={setShowEditCoursePane}
            courseId={courseEditId}
            course={course}
            setCourse={setCourse}
          />
        </>
      ) : (
        <PageLoader />
      )}
    </div>
  );
}
