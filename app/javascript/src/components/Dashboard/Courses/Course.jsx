import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PageLoader, Button, Badge, Label, Alert } from "nitroui";
import { PageHeading } from "nitroui/layouts";
import { showToastr } from "common";
import { getCourse, publishCourse, deleteCourse } from "apis/courses";
import Chapters from "../Chapters";
import ChapterPane from "../Chapters/Pane";
import CoursePane from "./Pane";
import Students from "../Students";
import CourseTemplate from "../Template";

export default function Course(props) {
  const [course, setCourse] = useState({});
  const [chapters, setChapters] = useState({});
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showstudents, setShowStudents] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    fetchSingleCourse();
  }, []);

  const fetchSingleCourse = (studentspane = false) => {
    getCourse(props.match.params.course_id).then(response => {
      setCourse(response.data.course);
      setChapters(response.data.chapters);
      setStudents(response.data.students);
      setIsLoading(false);
      setShowStudents(studentspane);
    });
  };

  function CourseDisplayForCreator({
    course,
    chapters,
    fetchSingleCourse,
    isLoading,
    students,
  }) {
    const [coursePane, setCoursePane] = useState(false);
    const [chapterPane, setChapterPane] = useState(false);

    const deleteSingleCourse = () => {
      deleteCourse(course.id).then(() => {
        showToastr("success", "Deleted successfully");
        props.history.push("/courses");
      });
    };

    const publishSingleCourse = () => {
      const payload = {
        course: {
          published: !course.published,
        },
      };
      publishCourse(course.id, payload).then(response => {
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
      <>
        {!isLoading ? (
          <div>
            <PageHeading
              title={`${course.name}`}
              rightButton={() => (
                <>
                  <Badge
                    color={course.published ? "green" : "yellow"}
                    className="mr-4 text-base"
                  >
                    {course.published
                      ? "Published course"
                      : "Unpublished course"}
                  </Badge>

                  <Button
                    label="Add Chapter"
                    icon="ri-add-line"
                    onClick={() => {
                      setChapterPane(true);
                    }}
                  />
                </>
              )}
            />
            <nav className="bg-gray-100 p-3 rounded-md">
              <p className="text-gray-600 text-base leading-tight leading-5">
                {course.description}
              </p>
              <div className="flex items-center justify-end w-full mt-4">
                <Label className="text-base text-indigo-500 ">
                  Invitation code: &nbsp;
                  <span className="font-bold">{course.invitation_code}</span>
                </Label>
                <Button
                  label="Students"
                  className="ml-4"
                  onClick={() => {
                    course.published
                      ? setShowStudents(true)
                      : showToastr(
                          "error",
                          "You cannot add students without publishing course"
                        );
                  }}
                />
                <Button
                  label="Edit Course"
                  className="ml-4"
                  onClick={() => {
                    setCoursePane(true);
                  }}
                />
                <Link
                  className="ml-4"
                  to={`/courses/${props.match.params.course_id}/preview`}
                >
                  <Button label="Preview Course" />
                </Link>

                <Button
                  label={
                    course.published
                      ? students.length
                        ? "Published Course"
                        : "Unpublish Course"
                      : "Publish Course"
                  }
                  className="ml-4"
                  onClick={() =>
                    students.length
                      ? showToastr(
                          "error",
                          "Students are present. You cannot unpublish course"
                        )
                      : publishSingleCourse()
                  }
                />
                <Button
                  label="Delete Course"
                  className="ml-4"
                  onClick={() => {
                    course.published
                      ? showToastr(
                          "error",
                          "You can not delete a published course"
                        )
                      : setShowAlert(true);
                  }}
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
            <Alert
              isOpen={showAlert}
              title="Delete Course"
              message="You are permanently deleting the course. This cannot be undone."
              confirmAction={deleteSingleCourse}
              cancelAction={() => setShowAlert(false)}
            />
          </div>
        ) : (
          <PageLoader />
        )}
      </>
    );
  }

  if (isLoading) {
    return <PageLoader />;
  } else {
    if (course.user_id == localStorage.user_id) {
      return (
        <CourseDisplayForCreator
          course={course}
          chapters={chapters}
          fetchSingleCourse={fetchSingleCourse}
          isLoading={isLoading}
          students={students}
        />
      );
    } else {
      return (
        <CourseTemplate
          isStudent={true}
          courseId={props.match.params.course_id}
        />
      );
    }
  }
}
