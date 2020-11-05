import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { getCourse } from "apis/courses";
import { showLesson } from "apis/lessons";
import SidePanel from "./SidePanel";
import Lesson from "./Lesson";

function ViewCourse(props) {
  const [showPane, setShowPane] = useState(false);
  const [course, setCourse] = useState({});
  const [chapters, setChapters] = useState([]);
  const [lesson, setLesson] = useState({});
  const [
    chaptersWithPublishedLessons,
    setChaptersWithPublishedLessons,
  ] = useState([]);

  const loadCourse = () => {
    getCourse(props.match.params.course_id).then(response => {
      setCourse(response.data.course);
      setChapters(response.data.chapters);
      setChaptersWithPublishedLessons(
        loadChaptersWithPublishedLessons(response.data.chapters)
      );
    });
  };

  function loadChaptersWithPublishedLessons(chapters) {
    return chapters.filter(chapter => {
      if (chapter.lessons.filter(lesson => lesson.is_published).length > 0) {
        return chapter;
      }
    });
  }

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
  }, []);

  return (
    <div className="flex">
      <SidePanel
        showPanel={showPane}
        course={course}
        chapters={chapters}
        setShowPane={setShowPane}
        getLesson={getLesson}
        lesson={lesson}
        isStudent={props.isStudent}
        chaptersWithPublishedLessons={chaptersWithPublishedLessons}
      />
      <Lesson
        lesson={lesson}
        content={lesson.lessonAttachment}
        courseId={course.id}
        chapters={chapters}
        getLesson={getLesson}
        isStudent={props.isStudent}
      />
    </div>
  );
}

export default withRouter(ViewCourse);