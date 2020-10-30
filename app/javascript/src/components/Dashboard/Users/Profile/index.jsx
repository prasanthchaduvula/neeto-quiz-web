import React, { useState } from "react";
import { Tab, Button } from "nitroui";
import { PageHeading } from "nitroui/layouts";
import GeneralSettings from "./Form";
import { TABS } from "./constants";
export default function Profile() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <>
      <PageHeading
        title="Profile Settings"
        rightButton={() => (
          <Button
            style="secondary"
            label="Logout"
            icon="ri-logout-box-r-line"
          />
        )}
      />
      <Tab className="px-6 -mx-4 border-b border-gray-200">
        <Tab.Item
          icon="ri-user-line"
          onClick={() => {
            if (activeTab !== TABS.profile) {
              setActiveTab(TABS.profile);
            }
          }}
          active={activeTab === TABS.profile}
        >
          Profile
        </Tab.Item>
      </Tab>
      <div className="flex flex-row items-start justify-center flex-grow">
        <div className="w-full h-full md:w-140">
          {activeTab === TABS.profile && <GeneralSettings />}
        </div>
      </div>
    </>
  );
}
