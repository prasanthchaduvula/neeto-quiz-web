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
            label="Add new instrcuor"
            icon="ri-add-line"
            onClick={() => setInstructorsPane(true)}
          />
        )}
      />
      {loading ? (
        <div className="min-h-screen flex items-center">
          <PageLoader />
        </div>
      ) : (
        <div>
          <ListInstructors instructors={instructors} />
          <InstructorsPane
            showPane={instructorsPane}
            setShowPane={setInstructorsPane}
            loadInstructors={loadInstructors}
          />
        </div>
      )}
    </div>
  );
}

export default Instructors;
