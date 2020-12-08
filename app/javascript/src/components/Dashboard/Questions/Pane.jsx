import React from "react";
import { Pane } from "neetoui";
import QuestionForm from "./Form";

function QuestionPane({
  showPane,
  setShowPane,
  mocktestId,
  fetchSingleMocktest,
}) {
  const onClose = () => setShowPane(false);

  return (
    <Pane title="Add Question" isOpen={showPane} onClose={onClose}>
      <div className="px-6">
        <QuestionForm
          onClose={onClose}
          mocktestId={mocktestId}
          fetchSingleMocktest={fetchSingleMocktest}
        />
      </div>
    </Pane>
  );
}

export default QuestionPane;
