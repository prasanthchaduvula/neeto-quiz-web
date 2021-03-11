import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { PageLoader } from "neetoui";
import { getMocktest } from "apis/mocktests";
import PageNotFound from "shared/PageNotFound";
import MocktestDisplayForCreator from "./MocktestDisplayForCreator";
import MocktestTemplate from "./Template";
import Result from "./Template/Result";

function Mocktest({ match, history }) {
  const [loading, setLoading] = useState(true);
  const [mocktest, setMocktest] = useState({});

  useEffect(() => {
    fetchSingleMocktest();
  }, []);

  const fetchSingleMocktest = async () => {
    let response = await getMocktest(match.params.id);
    setMocktest(response.data.mocktest);
    setLoading(false);
  };

  if (loading) {
    return <PageLoader />;
  } else if (mocktest.isCreator) {
    return (
      <MocktestDisplayForCreator
        mocktest={mocktest}
        fetchSingleMocktest={fetchSingleMocktest}
        history={history}
      />
    );
  } else if (!mocktest.isAttempt && mocktest.isStudent) {
    return (
      <MocktestTemplate mocktest={mocktest} questions={mocktest.questions} />
    );
  } else if (mocktest.isAttempt && mocktest.isStudent) {
    return <Result mocktestId={mocktest.id} attemptId={mocktest.attempt.id} />;
  } else {
    return <PageNotFound />;
  }
}

export default withRouter(Mocktest);
