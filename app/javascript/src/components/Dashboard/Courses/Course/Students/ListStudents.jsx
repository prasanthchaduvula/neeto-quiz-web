import React, { useState } from "react";
import { Button } from "neetoui";
import StudentPane from "./Pane";
import NoData from "shared/NoData";

export default function ListStudents({
  onClose,
  students,
  course,
  fetchSingleCourse,
}) {
  return (
    <>
      {students.length ? (
        <Students students={students} />
      ) : (
        <NoData
          message="We do not have students to show here. Please add students to this
        course."
        />
      )}
      <Pane
        onClose={onClose}
        course={course}
        fetchSingleCourse={fetchSingleCourse}
      />
    </>
  );
}

const Students = ({ students }) => {
  return (
    <div className="bg-gray">
      <ul>
        {students.map((student, index) => {
          return (
            <li key={student.id}>
              <div className="flex my-4">
                <span className="text-base text-gray-600 font-medium">{`${index +
                  1}. `}</span>
                <div className="ml-1">
                  <p className="text-sm font-medium">
                    {student.name.length > 1 ? student.name : "Name not added"}
                  </p>
                  <p className="mt-1 text-gray-600">{student.phone_number}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const Pane = ({ onClose, course, fetchSingleCourse }) => {
  const [studentPane, setStudentPane] = useState(false);
  return (
    <div className="absolute bottom-0 left-0 w-full bg-white nui-pane--footer">
      <Button onClick={onClose} label="Cancel" size="large" style="secondary" />
      <Button
        label="Add Student"
        className="ml-2"
        onClick={() => {
          setStudentPane(true);
        }}
      />

      <StudentPane
        showPane={studentPane}
        setShowPane={setStudentPane}
        course={course}
        fetchSingleCourse={fetchSingleCourse}
      />
    </div>
  );
};
