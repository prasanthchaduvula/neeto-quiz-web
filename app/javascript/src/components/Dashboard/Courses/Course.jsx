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
import PageNotFound from "../../shared/PageNotFound";

export default function Course(props) {
  const [course, setCourse] = useState({});
  const [chapters, setChapters] = useState({});
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showstudents, setShowStudents] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isCreator, setIsCreator] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [isMember, setIsMember] = useState(true);
  const [creator, setCreator] = useState({});

  useEffect(() => {
    fetchSingleCourse();
  }, []);

  const fetchSingleCourse = (studentspane = false) => {
    getCourse(props.match.params.course_id).then(response => {
      const {
        isCreator,
        isStudent,
        isMember,
        course,
        creator,
        chapters,
        students,
      } = response.data;
      setCourse(course);
      setChapters(chapters);
      setStudents(students);
      setIsCreator(isCreator);
      setIsStudent(isStudent);
      setIsMember(isMember);
      setCreator(creator);
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
              <div className="flex items-center justify-between w-full mt-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base text-indigo-500 ">
                    Price: &nbsp;
                    <span className="font-bold">
                      {course.price ? `Rs ${course.price}` : "Free"}
                    </span>
                  </Label>
                  <Label className="text-base text-indigo-500 ml-4">
                    Invitation code: &nbsp;
                    <span className="font-bold ">{course.invitation_code}</span>
                  </Label>
                </div>
                <div className="flex items-center justify-between">
                  <Button
                    label="Students"
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
                  <Link className="ml-4" to={`/courses/${course.id}/preview`}>
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
              creator={creator}
              fetchSingleCourse={fetchSingleCourse}
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

  return (
    <>
      {isLoading && <PageLoader />}
      {isCreator && (
        <CourseDisplayForCreator
          course={course}
          chapters={chapters}
          fetchSingleCourse={fetchSingleCourse}
          isLoading={isLoading}
          students={students}
        />
      )}

      {isStudent && (
        <CourseTemplate
          isStudent={true}
          courseId={props.match.params.course_id}
        />
      )}
      {!isMember && <PageNotFound />}
    </>
  );
}
