import React, { useEffect, useState } from "react";
import { PageHeading } from "neetoui/layouts";
import { Button, PageLoader, Tab } from "neetoui";
import { getMocktests } from "apis/mocktests";
import { TABS } from "./constants";
import ListMocktests from "./ListMocktests";
import MocktestPane from "./Mocktest/Pane";
import JoinMocktestPane from "./Join";

function Mocktests() {
  const [mocktestPane, setMocktestPane] = useState(false);
  const [mocktests, setMocktests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("myMocktests");
  const [joinMocktestPane, setJoinMocktestPane] = useState(false);

  useEffect(() => {
    fetchMocktests();
  }, []);

  const fetchMocktests = () => {
    getMocktests().then(response => {
      setMocktests(response.data);
      setLoading(false);
    });
  };

  return (
    <>
      <PageHeading
        title="Mock Tests"
        rightButton={() => (
          <>
            <Button
              style="secondary mr-2"
              label="Add new mocktest"
              icon="ri-add-line"
              onClick={() => setMocktestPane(true)}
            />
            <Button
              label="Join mocktest"
              icon="ri-send-plane-line"
              onClick={() => setJoinMocktestPane(true)}
            />
          </>
        )}
      />
      {loading ? (
        <PageLoader />
      ) : (
        <>
          <Tab className="px-6 -mx-4 border-b border-gray-200">
            <Tab.Item
              icon="ri-home-line"
              onClick={() => {
                setActiveTab(TABS.MY_MOCKTESTS);
              }}
              active={activeTab === TABS.MY_MOCKTESTS}
            >
              My Mocktests
            </Tab.Item>
            <Tab.Item
              icon="ri-pencil-line"
              onClick={() => {
                setActiveTab(TABS.CREATED_MOCKTESTS);
              }}
              active={activeTab === TABS.CREATED_MOCKTESTS}
            >
              Created Mocktests
            </Tab.Item>
            <Tab.Item
              icon="ri-send-plane-line"
              onClick={() => {
                setActiveTab(TABS.JOINED_MOCKTESTS);
              }}
              active={activeTab === TABS.JOINED_MOCKTESTS}
            >
              Joined Mocktests
            </Tab.Item>
          </Tab>

          <div className="my-5">
            {activeTab === TABS.MY_MOCKTESTS && (
              <ListMocktests mocktests={mocktests.my_mocktests} />
            )}
            {activeTab === TABS.CREATED_MOCKTESTS && (
              <ListMocktests mocktests={mocktests.created_mocktests} />
            )}
            {activeTab === TABS.JOINED_MOCKTESTS && (
              <ListMocktests mocktests={mocktests.joined_mocktests} />
            )}
          </div>
        </>
      )}
      <MocktestPane
        showPane={mocktestPane}
        setShowPane={setMocktestPane}
        isCreateForm={true}
        mocktest=""
        fetchMocktests={fetchMocktests}
        creator=""
        fetchSingleMocktest=""
      />
      <JoinMocktestPane
        showPane={joinMocktestPane}
        setShowPane={setJoinMocktestPane}
      />
    </>
  );
}

export default Mocktests;
