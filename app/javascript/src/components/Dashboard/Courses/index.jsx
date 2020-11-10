import React, { useState, useEffect } from "react";
import { PageHeading } from "nitroui/layouts";
import { Button, PageLoader, Tab } from "nitroui";
import { getCourses } from "apis/courses";
import CoursePane from "./Pane";
import { TABS } from "./constants";
import ListCourses from "./ListCourses";
import JoinCoursePane from "./Join";

export default function Courses() {
  const [coursePane, setCoursePane] = useState(false);
  const [courses, setCourses] = useState({});
  const [activeTab, setActiveTab] = useState("createdCourses");
  const [joinCoursePane, setJoinCoursePane] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = () => {
    getCourses().then(response => setCourses(response.data));
  };

  return (
    <div>
      <PageHeading
        title="Courses"
        rightButton={() => (
          <>
            <Button
              style="secondary mr-2"
              label="Add new course"
              icon="ri-add-line"
              onClick={() => setCoursePane(true)}
            />
            <Button
              label="Join course"
              icon="ri-send-plane-line"
              onClick={() => setJoinCoursePane(true)}
            />
          </>
        )}
      />
      {courses ? (
        <>
          <Tab className="px-6 -mx-4 border-b border-gray-200">
            <Tab.Item
              icon="ri-pencil-line"
              onClick={() => {
                setActiveTab(TABS.CREATED_COURSES);
              }}
              active={activeTab === TABS.CREATED_COURSES}
            >
              Created Courses
            </Tab.Item>
            <Tab.Item
              icon="ri-home-line"
              onClick={() => {
                setActiveTab(TABS.JOINED_COURSES);
              }}
              active={activeTab === TABS.JOINED_COURSES}
            >
              Joined Courses
            </Tab.Item>
          </Tab>

          <div className="my-5">
            {activeTab === TABS.CREATED_COURSES && (
              <ListCourses courses={courses.courses_created} create={true} />
            )}
            {activeTab === TABS.JOINED_COURSES && (
              <ListCourses courses={courses.courses_joined} create={false} />
            )}
          </div>
        </>
      ) : (
        <PageLoader />
      )}
      <JoinCoursePane
        showPane={joinCoursePane}
        setShowPane={setJoinCoursePane}
      />

      <CoursePane
        showPane={coursePane}
        setShowPane={setCoursePane}
        isCreateForm={true}
        course=""
        fetchCourses={fetchCourses}
        setCourse={""}
      />
    </div>
  );
}
