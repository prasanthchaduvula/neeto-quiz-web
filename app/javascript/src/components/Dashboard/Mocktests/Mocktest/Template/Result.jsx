import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { PageHeading } from "neetoui/layouts";
import { Button, PageLoader } from "neetoui";
import { withRouter } from "react-router-dom";
import { getAttempt } from "apis/mocktests";
import PageNotFound from "shared/PageNotFound";

function Result({ match, history, mocktestId, attemptId }) {
  const [isLoading, setIsLoading] = useState(true);
  const [metaData, setMetaData] = useState({});

  useEffect(() => {
    loadResult();
  }, []);

  const loadResult = async () => {
    let response = await getAttempt(
      mocktestId || match.params.mocktest_id,
      attemptId || match.params.id
    );
    setMetaData({ ...metaData, ...response.data });
    setIsLoading(false);
  };

  const DisplayAttempt = () => {
    const { mocktest, attempt } = metaData;

    return (
      <div>
        <PageHeading title={mocktest.name}></PageHeading>
        {attempt && (
          <>
            <div className="mt-20 mx-20">
              <p className="text-gray-500 text-base font-semibold tracking-wide text-lg">
                View result
              </p>
            </div>
            <div className="flex items-center justify-between mt-10 mx-20">
              <div className="flex w-3/5">
                <div className="bg-indigo-100 w-40 h-32 flex items-center justify-center mr-4">
                  <div>
                    <p className="text-indigo-500 font-semibold text-center text-lg">
                      Score
                    </p>
                    <p className="text-indigo-500 font-bold mt-4 text-center text-lg">
                      {`${attempt.correct_answers_count}/${mocktest.total_questions_count}`}
                    </p>
                    <p className="text-indigo-500 font-medium mt-4 text-center">
                      result
                    </p>
                  </div>
                </div>
                <div className="bg-green-100 w-40 h-32 flex items-center justify-center mr-4">
                  <div>
                    <p className="text-green-500 font-semibold text-center text-lg">
                      Correct
                    </p>
                    <p className="text-green-500 font-bold mt-4 text-center text-lg">
                      {attempt.correct_answers_count}
                    </p>
                    <p className="text-green-500 font-medium mt-4 text-center">
                      Ques
                    </p>
                  </div>
                </div>
                <div className="bg-red-100 w-40 h-32 flex items-center justify-center mr-4">
                  <div>
                    <p className="text-red-400 font-semibold text-center text-lg">
                      Wrong
                    </p>
                    <p className="text-red-400 font-bold mt-4 text-center text-lg">
                      {attempt.incorrect_answers_count}
                    </p>
                    <p className="text-red-400 font-medium mt-4 text-center">
                      Ques
                    </p>
                  </div>
                </div>
                <div className="bg-gray-100 w-40 h-32 flex items-center justify-center">
                  <div>
                    <p className="text-gray-500 font-semibold text-center text-lg">
                      Skipped
                    </p>
                    <p className="text-gray-500 font-bold mt-4 text-center text-lg">
                      {attempt.unattempted_questions_count}
                    </p>
                    <p className="text-gray-500 font-medium mt-4 text-center">
                      Ques
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-1/5">
                <div className="flex justify-between">
                  <p className="text-gray-500 text-base font-medium tracking-wide">
                    Percentile
                  </p>
                  <p
                    className={classNames(["font-bold text-base"], {
                      "text-green-600": attempt.percentile >= 35,
                      "text-red-600": attempt.percentile < 35,
                    })}
                  >
                    {attempt.percentile}%
                  </p>
                </div>
                <div className="flex justify-between mt-6">
                  <p className="text-gray-500 text-base font-medium tracking-wide">
                    Total Questions
                  </p>
                  <p className="text-gray-500 font-bold text-base">
                    {mocktest.total_questions_count}
                  </p>
                </div>
                <Button
                  label="View Solutions"
                  style="primary"
                  fullWidth
                  className="mt-6 text-center text-base font-bold"
                  onClick={() =>
                    history.push(
                      `/mocktests/${mocktest.id}/attempts/${attempt.id}`
                    )
                  }
                />
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  if (isLoading) {
    return <PageLoader />;
  } else if (metaData.isMember) {
    return <DisplayAttempt />;
  } else {
    return <PageNotFound />;
  }
}

export default withRouter(Result);
