import React, { useEffect, useState } from "react";
import ChapterApi from "../../../../apis/chapters";
import { PageLoader, Button } from "nitroui";
import { PageHeading } from "nitroui/layouts";
import EditChapterPane from "./EditChapterPane";

export default function ShowChapter(props) {
  const [chapterDetails, setChapterDetails] = useState({});
  const [showEditChapterPane, setShowEditChapterPane] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchChapter();
  }, []);

  const fetchChapter = () => {
    ChapterApi.fetchChapter(
      props.match.params.course_id,
      props.match.params.chapter_id
    ).then(response => {
      setChapterDetails(response.data);
      setIsLoading(false);
    });
  };
  return (
    <div>
      <PageHeading
        title="Lessons"
        rightButton={() => <Button label="Add new Lesson" icon="ri-add-line" />}
      />
      {!isLoading ? (
        <>
          <div className="flex-auto flex-row ">
            <div className="inline-flex max-w-screen-xl">
              <div className="px-3 py-8">
                <div className="flex justify-between">
                  <h1 className="text-gray-900 text-3xl leading-none mb-4">
                    {chapterDetails.chapter.name}
                  </h1>
                  <div className="flex">
                    <span className="inline-block  pl-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                      <Button
                        type="button"
                        label="Edit"
                        onClick={() => {
                          setShowEditChapterPane(true);
                        }}
                      />
                    </span>
                    <span className="inline-block  pl-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                      <Button
                        type="button"
                        label="Delete"
                        onClick={() => {
                          ChapterApi.deleteChapter(
                            props.match.params.course_id,
                            props.match.params.chapter_id
                          ).then(
                            () =>
                              (window.location.href = `/courses/${props.match.params.course_id}`)
                          );
                        }}
                      />
                    </span>
                  </div>
                </div>
                <div>
                  {chapterDetails.lessons.map(lesson => {
                    return (
                      <div key={lesson.id}>
                        <h2 className="text-blue-700 text-2xl pb-2">
                          {lesson.name}
                        </h2>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <EditChapterPane
            showPane={showEditChapterPane}
            setShowPane={setShowEditChapterPane}
            chapterDetails={chapterDetails}
            setChapter={setChapterDetails}
          />
        </>
      ) : (
        <PageLoader />
      )}
    </div>
  );
}
