import React, { useEffect, useState } from "react";
import { getCourse, deleteCourse } from "../../../apis/courses";
import EditCoursePane from "./EditCoursePane";
import { PageLoader, Button } from "nitroui";
import { PageHeading } from "nitroui/layouts";
import Chapters from "../Chapters";
import { showToastr } from "../../../common";
import NewChapterPane from "../chapters/NewChapterPane";

export default function Course(props) {
  const [course, setCourse] = useState({});
  const [chapters, setChapters] = useState({});
  const [showEditCoursePane, setShowEditCoursePane] = useState(false);
  const [showNewChapterPane, setShowNewChapterPane] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSingleCourse();
  }, [showEditCoursePane]);

  const fetchSingleCourse = () => {
    getCourse(props.match.params.course_id).then(response => {
      setCourse(response.data.course);
      setChapters(response.data.chapters);
      setIsLoading(false);
    });
  };

  const deleteSingleCourse = () => {
    deleteCourse(props.match.params.course_id).then(() => {
      showToastr("success", "Deleted successfully");
      props.history.push("/courses");
    });
  };
  return (
    <div className="">
      {!isLoading ? (
        <>
          <PageHeading
            title={`${course.name}`}
            rightButton={() => (
              <Button
                label="Add Chapter"
                icon="ri-add-line"
                onClick={() => {
                  setShowNewChapterPane(true);
                }}
              />
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
                  onClick={deleteSingleCourse}
                />
              </span>
            </div>
          </nav>
          <Chapters
            chapters={chapters}
            fetchSingleCourse={fetchSingleCourse}
            course={course}
          />
          <EditCoursePane
            showPane={showEditCoursePane}
            setShowPane={setShowEditCoursePane}
            course={course}
            setCourse={setCourse}
          />
          <NewChapterPane
            showPane={showNewChapterPane}
            setShowPane={setShowNewChapterPane}
            course={course}
            fetchSingleCourse={fetchSingleCourse}
          />
        </>
      ) : (
        <PageLoader />
      )}
    </div>
  );
}
