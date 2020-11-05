import React, { useState } from "react";
import { Tab, Button } from "nitroui";
import { PageHeading } from "nitroui/layouts";
import GeneralSettings from "./Form";
import { TABS } from "./constants";
import BankAccount from "./BankAccount";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("profile");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authPhone");
    localStorage.removeItem("user_id");
    window.location.href = "/";
  };

  return (
    <>
      <PageHeading
        title="Profile Settings"
        rightButton={() => (
          <Button
            style="secondary"
            label="Logout"
            icon="ri-logout-box-r-line"
            onClick={handleLogout}
          />
        )}
      />
      <Tab className="px-6 -mx-4 border-b border-gray-200">
        <Tab.Item
          icon="ri-user-line"
          onClick={() => {
            setActiveTab(TABS.PROFILE);
          }}
          active={activeTab === TABS.PROFILE}
        >
          Profile
        </Tab.Item>
        <Tab.Item
          icon="ri-lock-unlock-line"
          onClick={() => {
            setActiveTab(TABS.BANK_ACCOUNT);
          }}
          active={activeTab === TABS.BANK_ACCOUNT}
        >
          Bank Account
        </Tab.Item>
      </Tab>

      <div className="flex flex-row items-start justify-center flex-grow">
        {activeTab === TABS.PROFILE && <GeneralSettings />}
        {activeTab === TABS.BANK_ACCOUNT && <BankAccount />}
      </div>
    </>
  );
}
