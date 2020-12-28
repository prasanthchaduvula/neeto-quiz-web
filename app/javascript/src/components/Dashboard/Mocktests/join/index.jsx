import React, { useState } from "react";
import { Pane } from "neetoui";
import InvitationForm from "./InvitationForm";
import Details from "./Details";

function JoinMocktestPane({ setShowPane, showPane }) {
  const [invitationForm, setInvitationForm] = useState(true);
  const [mocktest, setMocktest] = useState({});

  const onClose = () => {
    setInvitationForm(true);
    setShowPane(false);
  };

  return (
    <Pane title="Join Mocktest" isOpen={showPane} onClose={onClose}>
      <div className="px-6">
        {invitationForm ? (
          <InvitationForm
            onClose={onClose}
            setInvitationForm={setInvitationForm}
            setMocktest={setMocktest}
          />
        ) : (
          <Details onClose={onClose} mocktest={mocktest} />
        )}
      </div>
    </Pane>
  );
}

export default JoinMocktestPane;
