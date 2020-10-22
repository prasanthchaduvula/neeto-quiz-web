import React, { useEffect, useState } from "react";
import CourseApi from "../../../apis/courses";
import EditCoursePane from "./EditCoursePane";
import { PageLoader, Button } from "nitroui";
import { PageHeading } from "nitroui/layouts";
import AddChapterPane from "./Chapters/AddChapterPane";

export default function IndivitualCourse(props) {
  const [courseDetails, setCourseDetails] = useState({});
  const [showEditCoursePane, setShowEditCoursePane] = useState(false);
  const [showAddChapterPane, setShowAddChapterPane] = useState(false);
  const [courseEditId] = useState(props.match.params.course_id);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSingleCourse();
  }, [showEditCoursePane]);

  const fetchSingleCourse = () => {
    CourseApi.fetchCourse(props.match.params.course_id).then(response => {
      setCourseDetails(response.data);
      setIsLoading(false);
    });
  };

  return (
    <div className="px-6 pt-4 pb-2">
      <PageHeading
        title="Chapters"
        rightButton={() => (
          <Button
            onClick={() => setShowAddChapterPane(true)}
            label="Add new Chapter"
            icon="ri-add-line"
          />
        )}
      />
      {!isLoading ? (
        <>
          <div className="flex-auto flex-row ">
            <div className="inline-flex max-w-xl">
              <div className="px-4 py-8">
                <div className="flex">
                  <h1 className="text-gray-900 text-5xl leading-none mb-4">
                    {courseDetails.course.name}
                  </h1>
                  <span className="inline-block  pl-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    <Button
                      type="button"
                      label="Edit"
                      onClick={() => {
                        setShowEditCoursePane(true);
                      }}
                    />
                  </span>
                  <span className="inline-block  pl-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    <Button
                      type="button"
                      label="Delete"
                      onClick={() => {
                        CourseApi.deleteCourse(
                          props.match.params.course_id
                        ).then(() => (window.location.href = "/courses"));
                      }}
                    />
                  </span>
                </div>
                <p className="text-gray-600 text-xl leading-tight">
                  {courseDetails.course.description}
                </p>
                <h2 className="my-4 text-gray-900 text-2xl">
                  Table of Contents
                </h2>
                <div>
                  {courseDetails.chapters.map(chapter => {
                    return (
                      <div key={chapter.id}>
                        <h2 className="text-blue-700 text-2xl pb-2">
                          {chapter.name}
                        </h2>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <EditCoursePane
            showPane={showEditCoursePane}
            setShowPane={setShowEditCoursePane}
            courseId={courseEditId}
            courseDetails={courseDetails}
            setCourse={setCourseDetails}
          />
          <AddChapterPane
            showPane={showAddChapterPane}
            setShowPane={setShowAddChapterPane}
            courseDetails={courseDetails}
          />
        </>
      ) : (
        <PageLoader />
      )}
    </div>
  );
}
