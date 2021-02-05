import React, { useState } from "react";
import { PageHeading } from "neetoui/layouts";
import { Tab } from "neetoui";
import { TABS } from "./constants";
import ExploreCourses from "../Courses/Explore";
import ExploreMocktests from "../Mocktests/Explore";

function Explore() {
  const [activeTab, setActiveTab] = useState("courses");

  return (
    <div>
      <PageHeading title="Explore Marketplace" />
      <Tab className="px-6 -mx-4 border-b border-gray-200">
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

      <div className="my-5">
        {activeTab === TABS.COURSES && <ExploreCourses />}
        {activeTab === TABS.MOCKTESTS && <ExploreMocktests />}
      </div>
    </div>
  );
}

export default Explore;
