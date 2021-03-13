import React, { useState } from "react";
import { Tab } from "neetoui";
import { PageHeading } from "neetoui/layouts";
import { TABS } from "./constants";
import OrganizationDetails from "./OrganizationDetails";
import PaymentDetails from "./PaymentDetails.jsx";

function Settings() {
  const [activeTab, setActiveTab] = useState("organization");
  return (
    <>
      <PageHeading title="Organization Settings" />
      <Tab className="px-6 -mx-4 border-b border-gray-200">
        <Tab.Item
          icon="ri-user-line"
          onClick={() => {
            setActiveTab(TABS.ORG_DETAILS);
          }}
          active={activeTab === TABS.ORG_DETAILS}
        >
          Organization Details
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
      </Tab>

      <div className="flex flex-row items-start justify-center flex-grow">
        {activeTab === TABS.ORG_DETAILS && <OrganizationDetails />}
        {activeTab === TABS.PAYMENT_DETAILS && <PaymentDetails />}
      </div>
    </>
  );
}

export default Settings;
