import React from "react";
import { Pane } from "neetoui";
import MocktestForm from "./Form";

function MocktestPane({
  showPane,
  setShowPane,
  isCreateForm,
  mocktest,
  fetchMocktests,
  creator,
  fetchSingleMocktest,
}) {
  const onClose = () => setShowPane(false);

  return (
    <Pane title="Add mocktest" isOpen={showPane} onClose={onClose}>
      <div className="px-6">
        <MocktestForm
          onClose={onClose}
          isCreateForm={isCreateForm}
          mocktest={mocktest}
          fetchMocktests={fetchMocktests}
          creator={creator}
          fetchSingleMocktest={fetchSingleMocktest}
        />
      </div>
    </Pane>
  );
}

export default MocktestPane;
