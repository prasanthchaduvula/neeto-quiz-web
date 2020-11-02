import React, { useState, useEffect } from "react";
import { PageHeading } from "nitroui/layouts";
import { Button, PageLoader, Tab } from "nitroui";
import { getCourses } from "apis/courses";
import ListCourses from "./ListCourses";
import CoursePane from "./Pane";
import { TABS } from "./constants";

export default function Courses() {
  const [coursePane, setCoursePane] = useState(false);
  const [courses, setCourses] = useState({});
  const [activeTab, setActiveTab] = useState("createdCourses");

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
          <Button
            onClick={() => setCoursePane(true)}
            label="Add new course"
            icon="ri-add-line"
          />
        )}
      />
      {courses ? (
        <>
          <Tab className="px-6 -mx-4 border-b border-gray-200">
            <Tab.Item
              icon="ri-user-line"
              onClick={() => {
                if (activeTab !== TABS.createdCourses) {
                  setActiveTab(TABS.createdCourses);
                }
              }}
              active={activeTab === TABS.createdCourses}
            >
              Created Courses
            </Tab.Item>
          </Tab>
          <div className="flex flex-row items-start justify-center flex-grow">
            <div className="w-full h-full md:w-140">
              {activeTab === TABS.createdCourses && (
                <ListCourses
                  courses={courses.courses_created}
                  joinedCourses={courses.courses_joined}
                />
              )}
            </div>
          </div>
        </>
      ) : (
        <PageLoader />
      )}

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
