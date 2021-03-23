import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { withRouter } from "react-router-dom";
import { PageHeading } from "neetoui/layouts";
import { PageLoader } from "neetoui";
import { getAttempts } from "apis/mocktests";
import PageNotFound from "shared/PageNotFound";
import NoData from "shared/NoData";

function Attempts({ match, history }) {
  const [mocktest, setMocktest] = useState({});
  const [attempts, setAttempts] = useState([]);
  const [isCreator, setIsCreator] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAttempts();
  }, []);

  const fetchAttempts = async () => {
    let response = await getAttempts(match.params.mocktest_id);
    const { isCreator, mocktest, attempts } = response.data;
    setMocktest(mocktest);
    setAttempts(attempts);
    setIsCreator(isCreator);
    setLoading(false);
  };

  const DisplayAttempts = () => {
    return (
      <div>
        <PageHeading title={`${mocktest.name}`} />
        {attempts.length ? (
          <>
            <h3 className="text-lg leading-6 font-medium text-gray-900 mt-8">
              These are attempts by students
            </h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6 my-8">
              {attempts.map(attempt => (
                <div
                  className="col-span-1 bg-white rounded-lg shadow px-5 py-4 cursor-pointer"
                  key={attempt.id}
                  onClick={() =>
                    history.push(
                      `/mocktests/${mocktest.id}/attempts/${attempt.id}/result`
                    )
                  }
                >
                  <div className="text-base font-medium text-gray-500 truncate">
                    {attempt.attempter_name}
                  </div>
                  <div className="mt-1 flex items-baseline justify-between">
                    <div className="text-2xl font-semibold text-gray-900">
                      {attempt.correct_answers_count}
                    </div>
                    <div
                      className={classNames([
                        "ml-2 flex items-center text-sm font-semibold",
                        {
                          "text-green-600": attempt.percentile >= 35,
                          "text-red-600": attempt.percentile < 35,
                        },
                      ])}
                    >
                      <i
                        className={
                          attempt.percentile >= 35
                            ? "ri-arrow-up-line"
                            : "ri-arrow-down-line"
                        }
                      ></i>
                      <span>{attempt.percentile}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <NoData message="We do not have any attempts by students to show here" />
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center">
        <PageLoader />
      </div>
    );
  } else if (isCreator) {
    return <DisplayAttempts />;
  } else {
    return <PageNotFound />;
  }
}

export default withRouter(Attempts);
