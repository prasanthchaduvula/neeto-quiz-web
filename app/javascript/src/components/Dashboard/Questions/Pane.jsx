import React from "react";
import { Pane } from "neetoui";
import QuestionForm from "./Form";

function QuestionPane({
  showPane,
  setShowPane,
  isCreateForm,
  mocktestId,
  fetchSingleMocktest,
  question,
}) {
  const onClose = () => setShowPane(false);

  return (
    <Pane title="Add Question" isOpen={showPane} onClose={onClose}>
      <div className="px-6">
        <QuestionForm
          onClose={onClose}
          isCreateForm={isCreateForm}
          mocktestId={mocktestId}
          fetchSingleMocktest={fetchSingleMocktest}
          question={question}
        />
      </div>
    </Pane>
  );
}

export default QuestionPane;
