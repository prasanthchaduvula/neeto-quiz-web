import React, { useState } from "react";
import { Tab, Button } from "neetoui";
import { PageHeading } from "neetoui/layouts";
import { useAuthDispatch } from "contexts/auth";
import { TABS } from "./constants";
import Profile from "./Profile";
import Orders from "./Orders";

function Account() {
  const authDispatch = useAuthDispatch();

  const [activeTab, setActiveTab] = useState("profile");

  const handleLogout = () => {
    authDispatch({
      type: "LOGOUT",
    });
    window.location.href = "/signin";
  };

  return (
    <>
      <PageHeading
        title="Account Settings"
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
            setActiveTab(TABS.ORDERS);
          }}
          active={activeTab === TABS.ORDERS}
        >
          My Orders
        </Tab.Item>
      </Tab>

      <div className="flex flex-row items-start justify-center flex-grow">
        {activeTab === TABS.PROFILE && <Profile />}
        {activeTab === TABS.ORDERS && <Orders />}
      </div>
    </>
  );
}

export default Account;
