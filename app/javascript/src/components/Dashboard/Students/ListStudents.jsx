import React from "react";
import moment from "moment";
import { Checkbox, Switch } from "neetoui";

function ListStudents({ students }) {
  const formatJoinedTime = joinedOn => {
    if (joinedOn) {
      return moment(joinedOn).format("MMM D, YYYY");
    }
  };

  const NoData = () => {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h4 className="text-xl ">
          We do not have students show here. Please add
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
              <Rows
                key={student.id}
                name={student.name}
                phoneNumber={student.phone_number}
                joinedOn={student.joined_on}
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

export default ListStudents;
