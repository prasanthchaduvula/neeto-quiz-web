import React, { useEffect, useState } from "react";
import LessonApi from "../../../apis/lessons";

export default function LessonList({ chapterId }) {
  const [lessons, setLessons] = useState("");

  useEffect(() => {
    LessonApi.fetchChapterLessons(chapterId).then(response => {
      setLessons(response.data.lessons);
    });
  }, []);

  return (
    <div>
      <p>lessons</p>
      {lessons &&
        lessons.map((lesson, index) => (
          <div key={index}>
            <p>{lesson.name}</p>
            <button>edit</button>
          </div>
        ))}
    </div>
  );
}
