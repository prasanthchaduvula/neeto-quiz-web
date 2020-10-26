import React, { useEffect, useState } from "react";
import CourseApi from "../../../apis/courses";
import EditCoursePane from "./EditCoursePane";
import { PageLoader, Button } from "nitroui";
import { PageHeading } from "nitroui/layouts";
import Chapters from "../Chapters";

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
      setCourse(response.data.course);
      setChapters(response.data.chapters);
      setIsLoading(false);
    });
  };

  return (
    <div className="">
      {!isLoading ? (
        <>
          <PageHeading
            title={`${course.name}`}
            rightButton={() => (
              <Button label="Add Chapter" icon="ri-add-line" />
            )}
          />
          <nav className="bg-gray-100 p-3 rounded-md">
            <p className="text-gray-600 text-base leading-tight leading-5">
              {course.description}
            </p>
            <div className="flex items-center justify-end w-full">
              <span className="inline-block  pl-3 py-1 text-sm font-semibold text-gray-700 ml-2 ">
                <Button
                  type="button"
                  label="Edit Course"
                  onClick={() => {
                    setShowEditCoursePane(true);
                  }}
                />
              </span>
              <span className="inline-block  pl-3 py-1 text-sm font-semibold text-gray-700 ml-2">
                <Button type="button" label="Preview Course" />
              </span>
              <span className="inline-block  pl-3 py-1 text-sm font-semibold text-gray-700 ml-2">
                <Button type="button" label="Publish Course" />
              </span>
              <span className="inline-block  pl-3 py-1 text-sm font-semibold text-gray-700 ml-2">
                <Button
                  type="button"
                  label="Delete Course"
                  onClick={() => {
                    CourseApi.deleteCourse(props.match.params.course_id).then(
                      () => (window.location.href = "/courses")
                    );
                  }}
                />
              </span>
            </div>
          </nav>
          <Chapters chapters={chapters} fetchSingleCourse={fetchSingleCourse} />
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
