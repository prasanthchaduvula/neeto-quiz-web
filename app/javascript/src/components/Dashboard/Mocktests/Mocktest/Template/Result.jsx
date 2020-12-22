import React from "react";
import { PageHeading } from "neetoui/layouts";
import { Button } from "neetoui";
import { withRouter } from "react-router-dom";

function Result({ mocktest, attempt, questions, history }) {
  return (
    <div>
      <PageHeading title={mocktest.name}></PageHeading>
      {attempt && (
        <>
          <div className="mt-20 mx-20">
            <p className="text-gray-500 text-base font-semibold tracking-wide text-lg">
              You are already attempted this mocktest.
            </p>
            <p className="text-gray-500 text-base font-semibold tracking-wide text-lg mt-6">
              This is your result.
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
                    {`${attempt.correct_answers_count}/${questions.length}`}
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
                  Perncentile
                </p>
                <p className="text-gray-500 font-bold text-base">
                  {(
                    (attempt.correct_answers_count / questions.length) *
                    100
                  ).toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between mt-6">
                <p className="text-gray-500 text-base font-medium tracking-wide">
                  Total Questions
                </p>
                <p className="text-gray-500 font-bold text-base">
                  {questions.length}
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
}

export default withRouter(Result);
