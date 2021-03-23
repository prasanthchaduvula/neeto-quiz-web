import React from "react";
import { Checkbox, Switch, Toastr } from "neetoui";
import { activateInstructor, inactivateInstructor } from "apis/instructors";
import FormatJoinedTime from "shared/FormatJoinedTime";
import NoData from "shared/NoData";

function ListInstructors({
  instructors,
  setInstructorsPane,
  setInstructor,
  setPaneTitle,
  setPaneMode,
  loadInstructors,
}) {
  const handleStatus = async (id, status) => {
    const sendRequest = () => {
      return status == "active"
        ? inactivateInstructor(id)
        : activateInstructor(id);
    };

    let response = await sendRequest();
    Toastr.success(response.data.notice);
    loadInstructors();
  };

  const Rows = ({ instructor }) => {
    return (
      <tr role="row" className={"cursor-pointer bg-white hover:bg-gray-50"}>
        <td>
          <Checkbox />
        </td>
        <td
          onClick={() => {
            setInstructorsPane(true);
            setInstructor(instructor);
            setPaneTitle("Instructor Info");
            setPaneMode("info");
          }}
        >
          {instructor.name}
        </td>
        <td>{instructor.phone_number}</td>
        <td>{FormatJoinedTime(instructor.joined_on)}</td>
        <td>
          <Switch
            checked={instructor.status == "active"}
            onChange={() => handleStatus(instructor.id, instructor.status)}
          />
        </td>
      </tr>
    );
  };

  return (
    <div>
      {instructors && instructors.length ? (
        <table className="nui-table nui-table--checkbox">
          <thead>
            <tr>
              <th className="px-2">
                <Checkbox />
              </th>
              <th>Instructor name</th>
              <th>Phone number</th>
              <th>Joined on</th>
              <th>State</th>
            </tr>
          </thead>
          <tbody>
            {instructors.map(instructor => (
              <Rows key={instructor.id} instructor={instructor} />
            ))}
          </tbody>
        </table>
      ) : (
        <NoData message="We do not have instructors show here. Please add" />
      )}
    </div>
  );
}

export default ListInstructors;
