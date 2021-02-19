import React, { useEffect, useState } from "react";
import { Button, Checkbox, Toastr, Alert } from "neetoui";
import TextareaAutosize from "react-textarea-autosize";
import { deleteQuestion } from "apis/questions";
import QuestionPane from "./Pane";

function Questions({ questions, mocktestId, fetchSingleMocktest }) {
  const [question, setQuestion] = useState({});
  const [selectedQuestionNumber, setSelectedQuestionNumber] = useState(1);
  const [questionPane, setQuestionPane] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
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
            <div className="overflow-y-scroll" style={{ height: "70vh" }}>
              <TextareaAutosize
                name="description"
                value={question.description}
                minRows={1}
                className="leading-8 text-base mt-4 w-full bg-white resize-none"
                disabled={true}
              />
              <div className="pt-4 pb-20 px-2">
                {question.options &&
                  question.options.map((option, index) => (
                    <div className="flex items-baseline mt-8" key={option.id}>
                      <Checkbox
                        name="option.is_correct"
                        checked={option.is_correct}
                        readOnly
                        disabled
                        className="cursor-text"
                      />
                      <TextareaAutosize
                        name={`option${index}`}
                        value={option.name}
                        minRows={1}
                        className="leading-6 font-normal text-base ml-4 w-full bg-white resize-none"
                        disabled={true}
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
      <div className="bg-gray-100  w-1/4">
        <div className="m-4">
          <p className="font-semibold text-base text-gray-500 mt-4">
            Question Pallete
          </p>
          <div className="overflow-y-scroll" style={{ height: "75vh" }}>
            <div className="grid grid-cols-5 gap-6 sm:grid-cols-2 lg:grid-cols-5 my-8">
              {questions.map((question, index) => (
                <p
                  className={`rounded-full h-8 w-8 flex items-center justify-center cursor-pointer  shadow ${
                    index + 1 == selectedQuestionNumber
                      ? "bg-indigo-500 text-white font-bold"
                      : "bg-gray-300"
                  }`}
                  onClick={() => {
                    setSelectedQuestionNumber(index + 1);
                    setQuestion(questions[index]);
                  }}
                  key={question.id}
                >
                  {index + 1}
                </p>
              ))}
            </div>
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
        <div className="flex justify-between ">
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
