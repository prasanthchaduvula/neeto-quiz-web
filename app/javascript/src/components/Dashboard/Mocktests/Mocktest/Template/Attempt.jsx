import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { PageHeading } from "neetoui/layouts";
import { Button, Radio } from "neetoui";
import { getAttempt } from "apis/mocktests";
import { withRouter } from "react-router-dom";

function Attempt({ match }) {
  const [mocktest, setMocktest] = useState({});
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState({});
  const [selectedQuestionNumber, setSelectedQuestionNumber] = useState(1);

  useEffect(() => {
    fetchAttempt();
    setQuestion(questions[selectedQuestionNumber - 1]);
  }, [questions.length]);

  const fetchAttempt = () => {
    getAttempt(match.params.mocktest_id, match.params.id).then(response => {
      const { mocktest, questions } = response.data;
      setMocktest(mocktest);
      setQuestions(questions);
    });
  };

  const questionBgLabel = question => {
    if (question.is_correct) {
      return classNames("bg-green-500 text-white font-bold");
    } else if (question.is_correct == false) {
      return classNames("bg-red-500 text-white font-bold");
    } else {
      return classNames("bg-gray-300");
    }
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
              <div className="pt-4 pb-6">
                {question.options &&
                  question.options.map(option => (
                    <div
                      className={`flex py-4 px-2 items-center ${option.is_correct &&
                        "bg-green-100"} `}
                      key={option.id}
                    >
                      <Radio.Item
                        label={option.name}
                        checked={option.is_selected}
                        readOnly
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
        <div className="overflow-y-scroll" style={{ height: "75vh" }}>
          <div className="grid grid-cols-5 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {questions.map((question, index) => (
              <p
                className={`rounded-full h-8 w-8 flex items-center justify-center cursor-pointer shadow ${index +
                  1 ==
                  selectedQuestionNumber &&
                  "border-2 border-indigo-600"} ${questionBgLabel(question)} `}
                onClick={() => {
                  setSelectedQuestionNumber(index + 1);
                  setQuestion(questions[index]);
                }}
                key={index}
              >
                {index + 1}
              </p>
            ))}
          </div>
        </div>
        <div className="flex justify-between py-4">
          <div className="flex">
            <span className="rounded-full h-5 w-5 bg-green-500 mr-2"></span>
            <span>Correct</span>
          </div>
          <div className="flex">
            <span className="rounded-full h-5 w-5 bg-red-500 mr-2"></span>
            <span>Incorrect</span>
          </div>
          <div className="flex">
            <span className="rounded-full h-5 w-5 bg-gray-300 mr-2"></span>
            <span>Skipped</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <PageHeading title={mocktest.name} />
      <div className="flex justify-between">
        <Question />
        <NumberPanel />
      </div>
    </div>
  );
}

export default withRouter(Attempt);
