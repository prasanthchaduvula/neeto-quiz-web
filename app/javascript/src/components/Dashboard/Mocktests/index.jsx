import React, { useEffect, useState } from "react";
import { useAuthState } from "contexts/auth";
import { PageHeading } from "neetoui/layouts";
import { Button, PageLoader } from "neetoui";
import { getMocktests } from "apis/mocktests";
import ListMocktests from "./ListMocktests";
import MocktestPane from "./Mocktest/Pane";
import JoinMocktestPane from "./Join";

function Mocktests() {
  const authState = useAuthState();
  const [mocktestPane, setMocktestPane] = useState(false);
  const [mocktests, setMocktests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [joinMocktestPane, setJoinMocktestPane] = useState(false);

  useEffect(() => {
    fetchMocktests();
  }, []);

  const fetchMocktests = async () => {
    let response = await getMocktests();
    setMocktests(response.data.mocktests);
    setLoading(false);
  };

  return (
    <>
      <PageHeading
        title="My Mocktests"
        rightButton={() => (
          <>
            {authState.authRole == "admin" ||
            authState.authRole == "instructor" ? (
              <Button
                label="Add new mocktest"
                icon="ri-add-line"
                onClick={() => setMocktestPane(true)}
              />
            ) : (
              <Button
                label="Join mocktest"
                icon="ri-send-plane-line"
                onClick={() => setJoinMocktestPane(true)}
              />
            )}
          </>
        )}
      />
      {loading ? <PageLoader /> : <ListMocktests mocktests={mocktests} />}
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
