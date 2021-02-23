import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { previewCourse } from "apis/courses";
import { showLesson } from "apis/lessons";
import SidePanel from "./SidePanel";
import Lesson from "./Lesson";

function ViewCourse(props) {
  const [showPane, setShowPane] = useState(false);
  const [course, setCourse] = useState({});
  const [chapters, setChapters] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [lesson, setLesson] = useState({});

  const loadCourse = async () => {
    let response = await previewCourse(props.match.params.course_id);
    setCourse(response.data.course);
    setChapters(response.data.chapters);
    setLessons(response.data.lessons);
  };

  const getLesson = (chapter_id, lesson_id) => {
    showLesson(chapter_id, lesson_id).then(response => {
      setLesson({
        ...response.data.lesson,
        lessonAttachment: response.data.link,
      });
    });
  };

  useEffect(() => {
    loadCourse();
    getLesson(props.match.params.chapter_id, props.match.params.lesson_id);
  }, [props.match.params.lesson_id]);

  return (
    <div className="flex">
      <SidePanel
        showPanel={showPane}
        setShowPane={setShowPane}
        course={course}
        chapters={chapters}
        getLesson={getLesson}
        lesson={lesson}
      />
      <Lesson
        lesson={lesson}
        courseId={course.id}
        lessons={lessons}
        setShowPane={setShowPane}
      />
    </div>
  );
}

export default withRouter(ViewCourse);
