import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { PageHeading } from "neetoui/layouts";
import { Button, Radio, Toastr } from "neetoui";
import { createAttempt } from "apis/mocktests";
import { withRouter } from "react-router-dom";

function MocktestTemplate({ mocktest, questions, history }) {
  const [question, setQuestion] = useState({});
  const [selectedQuestionNumber, setSelectedQuestionNumber] = useState(1);
  const [attemptedAnswers, setAttemptedAnswers] = useState([]);
  const [attemptedQuestions, setAttemptedQuestions] = useState([]);
  const [visitedQuestions, setVisitedQuestions] = useState([]);
  const [reviewQuestions, setReviewQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setQuestion(questions[selectedQuestionNumber - 1]);
    setVisitedQuestions(visitedQuestions.concat(questions[0].id));
  }, [questions]);

  const attemptQuestion = (questionId, optionId) => {
    if (attemptedQuestions.includes(questionId)) {
      attemptedAnswers.map((answer, index) => {
        if (answer.question_id === questionId) {
          setAttemptedAnswers(...attemptedAnswers.splice(index, 1));
          setAttemptedAnswers(
            attemptedAnswers.concat({
              question_id: questionId,
              option_id: optionId,
            })
          );
        }
      });
    } else {
      setAttemptedAnswers(
        attemptedAnswers.concat({
          question_id: questionId,
          option_id: optionId,
        })
      );
      setAttemptedQuestions(attemptedQuestions.concat(questionId));
    }
  };

  const selectedOption = (questionId, optionId) => {
    if (attemptedQuestions.includes(questionId)) {
      const attempted = attemptedAnswers.find(
        ans => ans.question_id === questionId
      );
      return optionId === attempted.option_id;
    }
  };

  const questionBgLabel = questionId => {
    if (
      reviewQuestions.includes(questionId) &&
      attemptedQuestions.includes(questionId)
    ) {
      return classNames(
        "bg-gradient-to-r from-green-500 to-yellow-300 text-black font-bold"
      );
    } else if (reviewQuestions.includes(questionId)) {
      return classNames("bg-yellow-300 text-black font-bold");
    } else if (attemptedQuestions.includes(questionId)) {
      return classNames("bg-green-500 text-white font-bold");
    } else if (visitedQuestions.includes(questionId)) {
      return classNames("bg-red-500 text-white font-bold");
    } else {
      return classNames("bg-gray-300");
    }
  };

  const submitAttempt = async () => {
    setLoading(true);
    const payload = {
      attempt_answers_attributes: attemptedAnswers,
    };
    let response = await createAttempt(mocktest.id, payload);
    Toastr.success(response.data.notice);
    setLoading(false);
    history.push(
      `/mocktests/${mocktest.id}/attempts/${response.data.attempt.id}/result`
    );
  };

  const Question = () => {
    return (
      <>
        {question && (
          <div className="w-9/12 my-4 mr-12">
            <p className="font-semibold text-base text-gray-500">
              {`Question ${selectedQuestionNumber}`}
            </p>
            <div className="overflow-y-scroll" style={{ height: "75vh" }}>
              <p className="font-medium text-base mt-8">
                {question.description}
              </p>
              <div className="pt-4 pb-6 px-2">
                {question.options &&
                  question.options.map(option => (
                    <div className="flex mt-8 items-center" key={option.id}>
                      <Radio.Item
                        label={option.name}
                        onChange={() => attemptQuestion(question.id, option.id)}
                        checked={selectedOption(question.id, option.id)}
                      />
                    </div>
                  ))}
              </div>
            </div>
            <div className="absolute bottom-0 w-8/12 bg-white flex justify-between nui-pane--footer py-5">
              <Button
                label="Previous"
                size="large"
                style="secondary"
                icon="ri-arrow-left-s-line"
                disabled={selectedQuestionNumber == 1}
                onClick={() => {
                  setSelectedQuestionNumber(selectedQuestionNumber - 1);
                  setQuestion(questions[selectedQuestionNumber - 2]);
                  !visitedQuestions.includes(
                    questions[selectedQuestionNumber - 2].id
                  ) &&
                    setVisitedQuestions(
                      visitedQuestions.concat(
                        questions[selectedQuestionNumber - 2].id
                      )
                    );
                }}
              />
              <Button
                label={
                  reviewQuestions.includes(question.id)
                    ? "Remove from review"
                    : "Mark for review"
                }
                size="large"
                style="secondary"
                onClick={() => {
                  reviewQuestions.includes(question.id)
                    ? setReviewQuestions(
                        reviewQuestions.filter(
                          questionId => questionId != question.id
                        )
                      )
                    : setReviewQuestions(reviewQuestions.concat(question.id));
                }}
              />
              <Button
                label="Next"
                size="large"
                style="primary"
                icon="ri-arrow-right-s-line"
                iconPosition="right"
                disabled={selectedQuestionNumber == questions.length}
                onClick={() => {
                  setSelectedQuestionNumber(selectedQuestionNumber + 1);
                  setQuestion(questions[selectedQuestionNumber]);
                  !visitedQuestions.includes(
                    questions[selectedQuestionNumber].id
                  ) &&
                    setVisitedQuestions(
                      visitedQuestions.concat(
                        questions[selectedQuestionNumber].id
                      )
                    );
                }}
              />
            </div>
          </div>
        )}
      </>
    );
  };
  const NumberPanel = () => {
    return (
      <div className="w-1/4 px-4 bg-gray-100">
        <p className="font-semibold text-base text-gray-500 py-4">
          Question Pallete
        </p>
        <div className="overflow-y-scroll" style={{ height: "62vh" }}>
          <div className="grid grid-cols-5 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {questions.map((question, index) => (
              <p
                className={`rounded-full h-8 w-8 flex items-center justify-center cursor-pointer shadow ${index +
                  1 ==
                  selectedQuestionNumber &&
                  "border-2 border-indigo-600"} ${questionBgLabel(
                  question.id
                )}`}
                onClick={() => {
                  setSelectedQuestionNumber(index + 1);
                  setQuestion(questions[index]);
                  setVisitedQuestions(visitedQuestions.concat(question.id));
                }}
                key={index}
              >
                {index + 1}
              </p>
            ))}
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <div className="flex">
            <span className="rounded-full h-5 w-5 bg-green-500 mr-2"></span>
            <span>Answered</span>
          </div>
          <div className="flex">
            <span className="rounded-full h-5 w-5 bg-red-500 mr-2"></span>
            <span>Not answered</span>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <div className="flex mr-4 mt-4">
            <span className="rounded-full h-5 w-5 bg-yellow-300 mr-2"></span>
            <span>Marked for review</span>
          </div>
          <div className="flex mr-4 mt-4">
            <span className="rounded-full h-5 w-5 bg-gray-300 mr-2"></span>
            <span>Not visited</span>
          </div>
        </div>
        <Button
          label="Submit Mocktest"
          fullWidth
          className="mt-5 mb-4 bg-indigo-500"
          onClick={submitAttempt}
          loading={loading}
        />
      </div>
    );
  };

  const NoData = () => {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h4 className="text-xl ">Please add questions to show here</h4>
      </div>
    );
  };

  return (
    <div>
      <PageHeading title={mocktest.name} />
      {questions.length ? (
        <div className="flex justify-between">
          <Question />
          <NumberPanel />
        </div>
      ) : (
        <NoData />
      )}
    </div>
  );
}
export default withRouter(MocktestTemplate);
