import React, { useEffect, useState } from "react";
import { Tab, PageLoader } from "neetoui";
import { getInstructor } from "apis/instructors";
import { TABS } from "./constants";
import Details from "./Details";
import Courses from "./Courses";
import Mocktests from "./Mocktests";

function Info({ id, setPaneMode, setPaneTitle }) {
  const [loading, setLoading] = useState(true);
  const [instructor, setInstructor] = useState("");
  const [courses, setCourses] = useState([]);
  const [mocktests, setMocktests] = useState([]);
  const [activeTab, setActiveTab] = useState("details");

  useEffect(() => {
    loadInstructor();
  }, []);

  const loadInstructor = async () => {
    let response = await getInstructor(id);
    setInstructor(response.data.instructor);
    setCourses(response.data.instructor.courses);
    setMocktests(response.data.instructor.mocktests);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center">
        <PageLoader />
      </div>
    );
  }

  return (
    <>
      <Tab className="px-6 -mx-4 border-b border-gray-200">
        <Tab.Item
          icon="ri-user-line"
          onClick={() => {
            setActiveTab(TABS.DETAILS);
          }}
          active={activeTab === TABS.DETAILS}
        >
          Details
        </Tab.Item>
        <Tab.Item
          icon="ri-book-open-line"
          onClick={() => {
            setActiveTab(TABS.COURSES);
          }}
          active={activeTab === TABS.COURSES}
        >
          Courses
        </Tab.Item>
        <Tab.Item
          icon="ri-file-list-3-line"
          onClick={() => {
            setActiveTab(TABS.MOCKTESTS);
          }}
          active={activeTab === TABS.MOCKTESTS}
        >
          Mocktests
        </Tab.Item>
      </Tab>

      <div className="p-6">
        {activeTab === TABS.DETAILS && (
          <Details
            instructor={instructor}
            setPaneMode={setPaneMode}
            setPaneTitle={setPaneTitle}
          />
        )}
        {activeTab === TABS.COURSES && (
          <Courses
            courses={courses}
            setPaneMode={setPaneMode}
            setPaneTitle={setPaneTitle}
          />
        )}
        {activeTab === TABS.MOCKTESTS && (
          <Mocktests
            mocktests={mocktests}
            setPaneMode={setPaneMode}
            setPaneTitle={setPaneTitle}
          />
        )}
      </div>
    </>
  );
}

export default Info;
