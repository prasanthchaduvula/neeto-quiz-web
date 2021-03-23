import React, { useEffect, useState } from "react";
import { PageHeading } from "neetoui/layouts";
import { Button, PageLoader } from "neetoui";
import { allInstructors } from "apis/instructors";
import InstructorsPane from "./Pane";
import ListInstructors from "./ListInstructors";

function Instructors() {
  const [loading, setLoading] = useState(true);
  const [instructors, setInstructors] = useState([]);
  const [instructorsPane, setInstructorsPane] = useState(false);
  const [instructor, setInstructor] = useState("");
  const [paneTitle, setPaneTitle] = useState("");
  const [paneMode, setPaneMode] = useState("");

  useEffect(() => {
    loadInstructors();
  }, []);

  const loadInstructors = async () => {
    let response = await allInstructors();
    setInstructors(response.data.instructors);
    setLoading(false);
  };

  return (
    <div>
      <PageHeading
        title="Instructors"
        rightButton={() => (
          <Button
            label="Add new instructor"
            icon="ri-add-line"
            onClick={() => {
              setInstructorsPane(true);
              setInstructor("");
              setPaneTitle("Add Instructor");
              setPaneMode("form");
            }}
          />
        )}
      />
      {loading ? (
        <div className="min-h-screen flex items-center">
          <PageLoader />
        </div>
      ) : (
        <div>
          <ListInstructors
            instructors={instructors}
            setInstructorsPane={setInstructorsPane}
            setInstructor={setInstructor}
            setPaneTitle={setPaneTitle}
            setPaneMode={setPaneMode}
            loadInstructors={loadInstructors}
          />
          <InstructorsPane
            setPaneMode={setPaneMode}
            setPaneTitle={setPaneTitle}
            paneTitle={paneTitle}
            paneMode={paneMode}
            showPane={instructorsPane}
            setShowPane={setInstructorsPane}
            loadInstructors={loadInstructors}
            instructor={instructor}
          />
        </div>
      )}
    </div>
  );
}

export default Instructors;
