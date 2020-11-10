import React, { useState } from "react";
import { Pane } from "nitroui";
import InvitationForm from "./InvitationForm";
import Details from "./Details";

export default function JoinCoursePane({ setShowPane, showPane }) {
  const onClose = () => {
    setInvitationForm(true);
    setShowPane(false);
  };
  const [invitationForm, setInvitationForm] = useState(true);
  const [course, setCourse] = useState({});
  const [chapters, setChapters] = useState([]);

  return (
    <Pane
      title="Join Course"
      isOpen={showPane}
      onClose={onClose}
      className={!invitationForm && "bg-gray-100"}
    >
      {invitationForm ? (
        <InvitationForm
          onClose={onClose}
          setInvitationForm={setInvitationForm}
          setCourse={setCourse}
          setChapters={setChapters}
        />
      ) : (
        <Details onClose={onClose} course={course} chapters={chapters} />
      )}
    </Pane>
  );
}
