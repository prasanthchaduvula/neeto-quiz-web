import React, { useEffect, useState } from "react";
import { PageHeading } from "neetoui/layouts";
import { Button, PageLoader } from "neetoui";
import { allStudents } from "apis/students";
import StudentsPane from "./Pane";
import ListStudents from "./ListStudents";

function Students() {
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [studentsPane, setStudentsPane] = useState(false);
  const [student, setStudent] = useState("");
  const [paneTitle, setPaneTitle] = useState("");
  const [paneMode, setPaneMode] = useState("");

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    let response = await allStudents();
    setStudents(response.data.students);
    setLoading(false);
  };

  return (
    <div>
      <PageHeading
        title="Students"
        rightButton={() => (
          <Button
            label="Add new student"
            icon="ri-add-line"
            onClick={() => {
              setStudentsPane(true);
              setStudent("");
              setPaneMode("form");
              setPaneTitle("Add Student");
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
          <ListStudents
            students={students}
            setStudentsPane={setStudentsPane}
            setStudent={setStudent}
            setPaneTitle={setPaneTitle}
            setPaneMode={setPaneMode}
          />
          <StudentsPane
            setPaneMode={setPaneMode}
            setPaneTitle={setPaneTitle}
            paneTitle={paneTitle}
            paneMode={paneMode}
            showPane={studentsPane}
            setShowPane={setStudentsPane}
            loadStudents={loadStudents}
            student={student}
          />
        </div>
      )}
    </div>
  );
}

export default Students;
