import React, { useState } from "react";
import { Button } from "nitroui";
import StudentPane from "./Pane";

export default function ListStudents({ students }) {
  const [studentPane, setStudentPane] = useState(false);

  const Students = () => {
    return (
      <div className="bg-gray">
        <ul>
          {students.map((student, index) => {
            return (
              <li key={student.id}>
                <div className="flex">
                  <span className="text-base text-gray-600 font-medium">{`${index +
                    1}. `}</span>
                  <div className="ml-1">
                    <p className="text-base font-medium">{student.name}</p>
                    <p className="text-base mt-1 text-gray-600">
                      {student.phone_number}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  const noResourceMessage = () => {
    return (
      <div className="text-center mt-5 mb-5">
        <h4>
          We do not have students to show here. Please add students to this
          course.
        </h4>
      </div>
    );
  };

  const display = () => {
    return (
      <>
        {students.length ? Students() : noResourceMessage()}
        <div className="absolute bottom-0 left-0 w-full bg-white nui-pane--footer">
          <Button
            label="Add Student"
            onClick={() => {
              setStudentPane(true);
            }}
          />

          <StudentPane showPane={studentPane} setShowPane={setStudentPane} />
        </div>
      </>
    );
  };

  return display();
}
