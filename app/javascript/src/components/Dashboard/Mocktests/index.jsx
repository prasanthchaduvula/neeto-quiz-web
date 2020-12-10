import React, { useEffect, useState } from "react";
import { PageHeading } from "neetoui/layouts";
import { Button, PageLoader } from "neetoui";
import { getMocktests } from "apis/mocktests";
import ListMocktests from "./ListMocktests";
import MocktestPane from "./Mocktest/Pane";

function Mocktests() {
  const [mocktestPane, setMocktestPane] = useState(false);
  const [mocktests, setMocktests] = useState([]);
  const [loading, setLoading] = useState(true);

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
              label="Add new mocktest"
              icon="ri-add-line"
              onClick={() => setMocktestPane(true)}
            />
          </>
        )}
      />
      {loading ? (
        <PageLoader />
      ) : (
        <ListMocktests mocktests={mocktests.created_mocktests} />
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
    </>
  );
}

export default Mocktests;
