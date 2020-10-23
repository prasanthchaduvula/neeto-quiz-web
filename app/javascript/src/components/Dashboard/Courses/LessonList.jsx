import React from "react";

export default function LessonList({ lessons }) {
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
