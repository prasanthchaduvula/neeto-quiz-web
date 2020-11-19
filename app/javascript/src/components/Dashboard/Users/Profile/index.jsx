import React, { useState, useEffect } from "react";
import { Tab, Button } from "nitroui";
import { PageHeading } from "nitroui/layouts";

import { TABS } from "./constants";
import GeneralSettings from "./Form";
import PaymentDetails from "./PaymentDetails";
import Orders from "./Orders";

export default function Profile(props) {
  const { location } = props;

  const [activeTab, setActiveTab] = useState("");

  const loadTab = () => {
    if (location.search) {
      setActiveTab(location.search.substring(1));
    } else {
      setActiveTab("profile");
    }
  };

  useEffect(() => {
    loadTab();
  }, [props]);

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
            setActiveTab(TABS.PAYMENT_DETAILS);
          }}
          active={activeTab === TABS.PAYMENT_DETAILS}
        >
          Payment Details
        </Tab.Item>
        <Tab.Item
          icon="ri-shopping-bag-line"
          onClick={() => {
            setActiveTab(TABS.ORDERS);
          }}
          active={activeTab === TABS.ORDERS}
        >
          My Orders
        </Tab.Item>
      </Tab>

      <div className="flex flex-row items-start justify-center flex-grow">
        {activeTab === TABS.PROFILE && <GeneralSettings />}
        {activeTab === TABS.PAYMENT_DETAILS && <PaymentDetails />}
        {activeTab === TABS.ORDERS && <Orders />}
      </div>
    </>
  );
}
