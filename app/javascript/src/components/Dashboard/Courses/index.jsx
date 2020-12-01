import React, { useState, useEffect } from "react";
import { PageHeading } from "neetoui/layouts";
import { Button, PageLoader, Tab } from "neetoui";
import { getCourses } from "apis/courses";
import CoursePane from "./Pane";
import { TABS } from "./constants";
import ListCourses from "./ListCourses";
import JoinCoursePane from "./Join";
import { withRouter } from "react-router-dom";

function Courses() {
  const [coursePane, setCoursePane] = useState(false);
  const [courses, setCourses] = useState({});
  const [activeTab, setActiveTab] = useState("myCourses");
  const [joinCoursePane, setJoinCoursePane] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = () => {
    getCourses().then(response => {
      setCourses(response.data);
      setLoading(false);
    });
  };

  return (
    <div>
      <PageHeading
        title="My Courses"
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
      {loading ? (
        <div className="min-h-screen flex items-center">
          <PageLoader />
        </div>
      ) : (
        <>
          <Tab className="px-6 -mx-4 border-b border-gray-200">
            <Tab.Item
              icon="ri-home-line"
              onClick={() => {
                setActiveTab(TABS.MY_COURSES);
              }}
              active={activeTab === TABS.MY_COURSES}
            >
              My Courses
            </Tab.Item>
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
              icon="ri-send-plane-line"
              onClick={() => {
                setActiveTab(TABS.JOINED_COURSES);
              }}
              active={activeTab === TABS.JOINED_COURSES}
            >
              Joined Courses
            </Tab.Item>
          </Tab>

          <div className="my-5">
            {activeTab === TABS.MY_COURSES && (
              <ListCourses courses={courses.my_courses} />
            )}
            {activeTab === TABS.CREATED_COURSES && (
              <ListCourses courses={courses.courses_created} />
            )}
            {activeTab === TABS.JOINED_COURSES && (
              <ListCourses courses={courses.courses_joined} />
            )}
          </div>
        </>
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
        setCourse=""
        creator=""
      />
    </div>
  );
}

export default withRouter(Courses);
