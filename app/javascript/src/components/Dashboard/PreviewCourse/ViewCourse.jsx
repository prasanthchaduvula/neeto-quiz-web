import React, { useEffect, useState } from "react";
import CourseApi from "apis/courses";
import { showLesson } from "apis/lessons";
import SidePanel from "./SidePanel";
import Lesson from "./Lesson";

export default function ViewCourse(props) {
  const [sidepanelVisible, setSidepanelVisible] = useState(true);
  const [course, setCourse] = useState({});
  const [chapters, setChapters] = useState([]);
  const [lesson, setLesson] = useState({});

  const getCourse = () => {
    CourseApi.fetchCourse(props.match.params.course_id).then(response => {
      setCourse(response.data.course);
      setChapters(response.data.chapters);
    });
  };

  const getLesson = () => {
    showLesson(
      props.match.params.chapter_id,
      props.match.params.lesson_id
    ).then(response => {
      setLesson(response.data.lesson);
    });
  };

  useEffect(() => {
    getCourse();
    getLesson();
  }, []);

  return (
    <div className="flex">
      <SidePanel
        showPanel={sidepanelVisible}
        course={course}
        chapters={chapters}
        setSidepanel={setSidepanelVisible}
      />
      <Lesson lesson={lesson} />
    </div>
  );
}
