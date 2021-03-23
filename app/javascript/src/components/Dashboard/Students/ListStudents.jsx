import React from "react";
import { Checkbox, Switch, Toastr } from "neetoui";
import { activateStudent, inactivateStudent } from "apis/students";
import FormatJoinedTime from "shared/FormatJoinedTime";
import NoData from "shared/NoData";

function ListStudents({
  students,
  setStudentsPane,
  setStudent,
  setPaneTitle,
  setPaneMode,
  loadStudents,
}) {
  const handleStatus = async (id, status) => {
    const sendRequest = () => {
      return status == "active" ? inactivateStudent(id) : activateStudent(id);
    };

    let response = await sendRequest();
    Toastr.success(response.data.notice);
    loadStudents();
  };

  const Rows = ({ student }) => {
    return (
      <tr role="row" className={"cursor-pointer bg-white hover:bg-gray-50"}>
        <td>
          <Checkbox />
        </td>
        <td
          onClick={() => {
            setStudentsPane(true);
            setStudent(student);
            setPaneTitle("Student Info");
            setPaneMode("info");
          }}
        >
          {student.name}
        </td>
        <td>{student.phone_number}</td>
        <td>{FormatJoinedTime(student.joined_on)}</td>
        <td>
          <Switch
            checked={student.status == "active"}
            onChange={() => handleStatus(student.id, student.status)}
          />
        </td>
      </tr>
    );
  };

  return (
    <div>
      {students && students.length ? (
        <table className="nui-table nui-table--checkbox">
          <thead>
            <tr>
              <th className="px-2">
                <Checkbox />
              </th>
              <th>Student name</th>
              <th>Phone number</th>
              <th>Joined on</th>
              <th>State</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <Rows key={student.id} student={student} />
            ))}
          </tbody>
        </table>
      ) : (
        <NoData message="We do not have students show here. Please add" />
      )}
    </div>
  );
}

export default ListStudents;
