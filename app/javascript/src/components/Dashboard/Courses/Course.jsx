import React, { useEffect, useState } from "react";
import { PageLoader, Button } from "nitroui";
import { PageHeading } from "nitroui/layouts";
import { showToastr } from "common";
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
<<<<<<< HEAD
  const [students, setStudents] = useState([]);
  const [showstudents, setShowStudents] = useState(false);
=======
  const [showEditChapterPane, setShowEditChapterPane] = useState(false);
  const [editChapterId, setEditChapterId] = useState("");
  const [chapterDetails, setchapterDetails] = useState({});
>>>>>>> edit chapter and delete chapter implemented

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

<<<<<<< HEAD
  const deleteSingleCourse = () => {
    deleteCourse(course.id).then(() => {
      showToastr("success", "Deleted successfully");
      props.history.push("/courses");
    });
=======
  const handleChapterEdit = id => {
    setShowEditChapterPane(true);
    setEditChapterId(id);
  };

  useEffect(() => {
    if (editChapterId) {
      fetchChapter(props.match.params.course_id, editChapterId);
    }
  }, [editChapterId]);

  const fetchChapter = (courseId, chapterId) => {
    ChapterApi.fetchChapter(courseId, chapterId).then(response =>
      setchapterDetails(response.data)
    );
  };

  useEffect(() => {
    if (chapterDetails.chapter) {
      updateChaptersArrayWithUpdatedChapter(chapterDetails);
    }
  }, [chapterDetails]);

  const updateChaptersArrayWithUpdatedChapter = chapterDetail => {
    if (chapterDetail.chapter.id) {
      let updatedChapters = chapters.map(item => {
        if (item.chapter.id == chapterDetail.chapter.id) {
          return chapterDetail;
        } else {
          return item;
        }
      });
      setChapters(updatedChapters);
    }
>>>>>>> resolved the problem of chapters not re-rendering with updated props on the use of response object from update request rather than making an ajax request for refetching the single course every time one update the chapter.
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
