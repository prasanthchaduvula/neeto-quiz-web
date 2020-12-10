import React, { useEffect, useState } from "react";
import {
  PageLoader,
  Button,
  Badge,
  Label,
  Alert,
  Toastr,
  Dropdown,
} from "neetoui";
import { PageHeading } from "neetoui/layouts";
import {
  getCourse,
  deleteCourse,
  publishCourse,
  unpublishCourse,
  updateExploreCourse,
} from "apis/courses";
import PageNotFound from "../../../shared/PageNotFound";
import Students from "./Students";
import CourseTemplate from "./Template";
import Chapters from "./Chapters";
import ChapterPane from "./Chapters/Pane";
import CoursePane from "./Pane";

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
        Toastr.success("Deleted successfully");
        props.history.push("/courses");
      });
    };

    const publishSingleCourse = () => {
      publishCourse(course.id).then(response => {
        Toastr.success(response.data.notice);
        fetchSingleCourse();
      });
    };

    const unpublishSingleCourse = () => {
      unpublishCourse(course.id).then(response => {
        Toastr.success(response.data.notice);
        fetchSingleCourse();
      });
    };

    const addCourseToMarketPlace = () => {
      const payload = {
        course: {
          is_explored: !course.is_explored,
        },
      };
      updateExploreCourse(course.id, payload).then(response => {
        Toastr.success(
          `Course ${
            response.data.course.is_explored
              ? "Added to market place"
              : "Removed from market place"
          } successfully`
        );
        fetchSingleCourse();
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
                    style="primary"
                    className="mr-4"
                    onClick={() => {
                      setChapterPane(true);
                    }}
                  />

                  <Dropdown
                    label="Settings"
                    popoverClassName="pb-2"
                    position="bottom-right"
                    buttonStyle="primary"
                    closeOnSelect
                  >
                    <li
                      onClick={() => {
                        course.published
                          ? setShowStudents(true)
                          : Toastr.error(
                              "You cannot add students without publishing course"
                            );
                      }}
                    >
                      Students
                    </li>
                    <li
                      onClick={() => {
                        props.history.push(`/courses/${course.id}/preview`);
                      }}
                    >
                      Preview
                    </li>
                    <li
                      onClick={() => {
                        setCoursePane(true);
                      }}
                    >
                      Edit
                    </li>
                    <li
                      className={`${course.published && "text-red-600"}`}
                      onClick={() =>
                        course.published
                          ? students.length
                            ? Toastr.error(
                                "Students are present. You cannot unpublish course"
                              )
                            : unpublishSingleCourse()
                          : publishSingleCourse()
                      }
                    >
                      {course.published
                        ? students.length
                          ? "Published Course"
                          : "Unpublish Course"
                        : "Publish Course"}
                    </li>
                    <li
                      className={`${course.is_explored && "text-red-600"}`}
                      onClick={() => addCourseToMarketPlace()}
                    >
                      {course.is_explored
                        ? "Remove from market place"
                        : "Add to market place"}
                    </li>
                    <li
                      className="text-red-600"
                      onClick={() => {
                        course.published
                          ? Toastr.error(
                              "You can not delete a published course"
                            )
                          : setShowAlert(true);
                      }}
                    >
                      Delete
                    </li>
                  </Dropdown>
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
