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
  const [isStudent, setIsStudent] = useState("");
  const [
    chaptersWithPublishedLessons,
    setChaptersWithPublishedLessons,
  ] = useState([]);

  const loadCourse = async () => {
    let response = await getCourse(props.match.params.course_id);
    setCourse(response.data.course);
    setChapters(response.data.chapters);
    setChaptersWithPublishedLessons(
      loadChaptersWithPublishedLessons(response.data.chapters)
    );
    setIsStudent(response.data.creator.id != localStorage.user_id);
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
        isStudent={isStudent}
        chaptersWithPublishedLessons={chaptersWithPublishedLessons}
      />
      <Lesson
        lesson={lesson}
        courseId={course.id}
        chapters={chapters}
        isStudent={isStudent}
        setShowPane={setShowPane}
      />
    </div>
  );
}

export default withRouter(ViewCourse);
