import React, { useEffect, useState } from "react";
import { Button, Checkbox, Toastr, Alert } from "neetoui";
import { deleteQuestion } from "apis/questions";
import QuestionPane from "./Pane";

function Questions({ questions, mocktestId, fetchSingleMocktest }) {
  const [question, setQuestion] = useState({});
  const [numberOfQuestions, setNumberOfQuestions] = useState([]);
  const [selectedQuestionNumber, setSelectedQuestionNumber] = useState(1);
  const [questionPane, setQuestionPane] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    let arr = [];
    for (let i = 1; i <= questions.length; i++) {
      arr.push(i);
    }
    setNumberOfQuestions(arr);
    setQuestion(questions[selectedQuestionNumber - 1]);
  }, [questions]);

  const deleteSingleQuestion = () => {
    deleteQuestion(mocktestId, question.id).then(() => {
      setShowAlert(false);
      Toastr.success("Question deleted Successfully");
      if (questions.length == selectedQuestionNumber && questions.length > 1) {
        setSelectedQuestionNumber(selectedQuestionNumber - 1);
      }
      fetchSingleMocktest();
    });
  };

  const Question = () => {
    return (
      <>
        {question && (
          <div className="w-9/12 my-4 mr-12">
            <div className="flex justify-between items-center w-full">
              <p className="font-semibold text-base text-gray-500">
                {`Question ${selectedQuestionNumber}`}
              </p>
              <div className="flex items-center">
                <Button
                  style="icon"
                  icon="ri-pencil-line"
                  className="text-indigo-500 mr-4 font-bold text-xl"
                  onClick={() => setQuestionPane(true)}
                />
                <Button
                  style="icon"
                  icon="ri-delete-bin-line"
                  className="text-red-500"
                  onClick={() => setShowAlert(true)}
                />
              </div>
            </div>
            <p className="font-medium text-base mt-8">{question.description}</p>
            <div className="pt-4 pb-20 px-2">
              {question.options &&
                question.options.map(option => (
                  <div className="flex mt-8 items-center" key={option.id}>
                    <Checkbox
                      name="option.is_correct"
                      label={option.name}
                      checked={option.is_correct}
                      readOnly
                    />
                  </div>
                ))}
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
      <div className="border-2 border-black-500 min-h-screen w-1/4">
        <div className="m-4">
          <p className="font-semibold text-base text-gray-500 mt-4">
            Question Pallete
          </p>
          <div className="grid grid-cols-5 gap-6 sm:grid-cols-2 lg:grid-cols-5 my-8">
            {numberOfQuestions.map((questionNumber, index) => (
              <p
                className={`rounded-full h-8 w-8 flex items-center justify-center cursor-pointer  shadow ${
                  questionNumber == selectedQuestionNumber
                    ? "bg-indigo-500 text-white font-bold"
                    : "bg-gray-100"
                }`}
                onClick={() => {
                  setSelectedQuestionNumber(questionNumber);
                  setQuestion(questions[index]);
                }}
                key={index}
              >
                {questionNumber}
              </p>
            ))}
          </div>
        </div>
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
      {questions.length ? (
        <div className="flex justify-between">
          <Question />
          <NumberPanel />
        </div>
      ) : (
        <NoData />
      )}
      <QuestionPane
        showPane={questionPane}
        setShowPane={setQuestionPane}
        mocktestId={mocktestId}
        fetchSingleMocktest={fetchSingleMocktest}
        question={question}
      />
      <Alert
        isOpen={showAlert}
        title="Delete Question"
        message="You are permanently deleting the question. This cannot be undone."
        confirmAction={deleteSingleQuestion}
        cancelAction={() => setShowAlert(false)}
      />
    </div>
  );
}
export default Questions;
