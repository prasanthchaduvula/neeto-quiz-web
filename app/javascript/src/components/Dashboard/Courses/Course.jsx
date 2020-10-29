import React, { useEffect, useState } from "react";
import { PageLoader, Button } from "nitroui";
import { PageHeading } from "nitroui/layouts";
import { showToastr, showSweetAlert } from "common";
import { getCourse, updateCourse, deleteCourse } from "apis/courses";
import Chapters from "../Chapters";
import ChapterPane from "../Chapters/Pane";
import CoursePane from "./Pane";
import Students from "../Students";

export default function Course(props) {
  const [course, setCourse] = useState({});
  const [chapters, setChapters] = useState({});
  const [coursePane, setCoursePane] = useState(false);
  const [chapterPane, setChapterPane] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [showstudents, setShowStudents] = useState(false);

  useEffect(() => {
    fetchSingleCourse();
  }, [coursePane]);

  const fetchSingleCourse = () => {
    getCourse(props.match.params.course_id).then(response => {
      setCourse(response.data.course);
      setChapters(response.data.chapters);
      setStudents(response.data.students);
      setIsLoading(false);
    });
  };

  const deleteSingleCourse = () => {
    showSweetAlert(course.name, "course").then(result => {
      if (result.value) {
        deleteCourse(course.id).then(() => {
          showToastr("success", "Deleted successfully");
          props.history.push("/courses");
        });
      }
    });
  };

  const publishCourse = () => {
    const payload = {
      course: {
        published: !course.published,
      },
    };
    updateCourse(course.id, payload).then(response => {
      showToastr(
        "success",
        `Course ${
          response.data.course.published ? "Published" : "Unpublished"
        } successfully`
      );
      setCourse(response.data.course);
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
              <Button
                label="Students"
                onClick={() => {
                  setShowStudents(true);
                }}
              />
              <Button
                label="Edit Course"
                className="ml-4"
                onClick={() => {
                  setCoursePane(true);
                }}
              />
              <Button label="Preview Course" className="ml-4" />
              <Button
                label={course.published ? "Unpublish Course" : "Publish Course"}
                className="ml-4"
                onClick={publishCourse}
              />
              <Button
                label="Delete Course"
                className="ml-4"
                onClick={deleteSingleCourse}
              />
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
          <Students
            showPane={showstudents}
            setShowPane={setShowStudents}
            isCreateForm={false}
            students={students}
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
