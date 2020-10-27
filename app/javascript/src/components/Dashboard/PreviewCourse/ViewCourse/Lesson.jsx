import React from "react";
import { PageHeading } from "nitroui/layouts";
import ReactPlayer from "react-player";

function Lesson({ lesson }) {
  return (
    <div className="w-auto p-2">
      <PageHeading title={lesson.name} customClass="ml-2 border-none" />
      <div className="bg-gray-100 p-3 rounded-md ">
        <p className="text-gray-600 text-base leading-tight leading-5">
          {lesson.description}
        </p>
      </div>

      <ReactPlayer url={lesson.content} />
    </div>
  );
}

export default Lesson;
