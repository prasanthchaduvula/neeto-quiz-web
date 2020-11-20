import React from "react";
import { Button, Toastr } from "nitroui";
import { joinCourse } from "apis/courses";
import BuyCourseBtn from "./BuyCourseBtn";
import TableOfContents from "./TableOfContents";
import { withRouter } from "react-router-dom";

function Details({ onClose, course, chapters, history }) {
  function loadChaptersWithPublishedLessons(chapters) {
    return chapters.filter(chapter => {
      if (chapter.lessons.filter(lesson => lesson.is_published).length > 0) {
        return chapter;
      }
    });
  }

  const handleSubmit = () => {
    joinCourse(course.id).then(response => {
      Toastr.success(response.data.notice);
      onClose();
      history.push(`/courses/${course.id}`);
    });
  };

  return (
    <>
      <div className="pb-10 pt-4 px-6 bg-gray-100 min-h-screen">
        <p className="leading-5 truncate text-lg font-semibold mb-2">
          {course.name}
        </p>
        <p className="text-base leading-5 text-gray-500 mb-2">
          {course.description}
        </p>
        <p className="text-base font-semibold mb-4">Table Of Contents</p>
        {loadChaptersWithPublishedLessons(chapters).map(chapter => (
          <TableOfContents
            key={chapter.chapter.id}
            chapter={chapter.chapter}
            lessons={chapter.lessons}
          />
        ))}
      </div>
      <div className="absolute bottom-0 left-0 w-full bg-white nui-pane--footer">
        {course.price ? (
          <BuyCourseBtn course={course} />
        ) : (
          <Button
            label="Join this course for free"
            size="large"
            style="primary"
            fullWidth
            className="ml-2 text-center text-base font-bold"
            onClick={handleSubmit}
          />
        )}
      </div>
    </>
  );
}

export default withRouter(Details);
