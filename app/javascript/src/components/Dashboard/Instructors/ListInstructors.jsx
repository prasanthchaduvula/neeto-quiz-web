import React from "react";
import moment from "moment";
import { Checkbox, Switch } from "neetoui";

function ListInstructors({ instructors }) {
  function formatJoinedTime(joinedOn) {
    if (joinedOn) {
      return moment(joinedOn).format("MMM D, YYYY");
    }
  }
  const NoData = () => {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h4 className="text-xl ">
          We do not have instructors show here. Please add
        </h4>
      </div>
    );
  };

  const Rows = ({ key, name, phoneNumber, joinedOn }) => {
    return (
      <tr
        role="row"
        key={key}
        className={"cursor-pointer bg-white hover:bg-gray-50"}
      >
        <td>
          <Checkbox />
        </td>
        <td>{name}</td>
        <td>{phoneNumber}</td>
        <td>{formatJoinedTime(joinedOn)}</td>
        <td>
          <Switch />
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
              <Rows
                key={instructor.id}
                name={instructor.name}
                phoneNumber={instructor.phone_number}
                joinedOn={instructor.joined_on}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <NoData />
      )}
    </div>
  );
}

export default ListInstructors;
