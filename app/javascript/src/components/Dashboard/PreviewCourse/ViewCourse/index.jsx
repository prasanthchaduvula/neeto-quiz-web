import React, { useEffect, useState } from "react";
import { getCourse } from "apis/courses";
import { showLesson } from "apis/lessons";
import SidePanel from "./SidePanel";
import Lesson from "./Lesson";

export default function ViewCourse(props) {
  const [sidepaneVisible, setSidepaneVisible] = useState(false);
  const [course, setCourse] = useState({});
  const [chapters, setChapters] = useState([]);
  const [lesson, setLesson] = useState({});
  const [lessonContent, setLessonContent] = useState("");

  const loadCourse = () => {
    getCourse(props.match.params.course_id).then(response => {
      setCourse(response.data.course);
      setChapters(response.data.chapters);
    });
  };

  const getLesson = (chapter_id, lesson_id) => {
    showLesson(chapter_id, lesson_id).then(response => {
      setLesson(response.data.lesson);
      setLessonContent(response.data.link);
    });
  };

  useEffect(() => {
    loadCourse();
    getLesson(props.match.params.chapter_id, props.match.params.lesson_id);
  }, []);

  return (
    <div className="flex">
      <SidePanel
        showPanel={sidepaneVisible}
        course={course}
        chapters={chapters}
        setSidepanel={setSidepaneVisible}
        getLesson={getLesson}
        lessonId={lesson.id}
      />
      <Lesson
        lesson={lesson}
        content={lessonContent}
        courseId={course.id}
        getLesson={getLesson}
      />
    </div>
  );
}
