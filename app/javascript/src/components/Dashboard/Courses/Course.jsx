import React, { useEffect, useState } from "react";
import { PageLoader, Button } from "nitroui";
import { PageHeading } from "nitroui/layouts";
import { showToastr } from "common";
import { getCourse, deleteCourse } from "apis/courses";
import Chapters from "../Chapters";
import ChapterPane from "../Chapters/Pane";
import CoursePane from "./Pane";

export default function Course(props) {
  const [course, setCourse] = useState({});
  const [chapters, setChapters] = useState({});
  const [coursePane, setCoursePane] = useState(false);
  const [chapterPane, setChapterPane] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSingleCourse();
  }, [coursePane]);

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
                  setChapterPane(true);
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
                    setCoursePane(true);
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
          <CoursePane
            showPane={coursePane}
            setShowPane={setCoursePane}
            isCreateForm={false}
            course={course}
            setCourse={setCourse}
          />
          <ChapterPane
            showPane={chapterPane}
            setShowPane={setChapterPane}
            isCreateForm={true}
            course={course}
            chapter=""
            fetchSingleCourse={fetchSingleCourse}
          />
        </>
      ) : (
        <PageLoader />
      )}
    </div>
  );
}
