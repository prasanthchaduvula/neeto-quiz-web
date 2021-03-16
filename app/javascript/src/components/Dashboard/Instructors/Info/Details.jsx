import React from "react";
import { Button, Label } from "neetoui";

function Details({ instructor, setPaneMode, setPaneTitle }) {
  const DetailsBlock = ({ label, value }) => {
    return (
      <div className="flex flex-col justify-start items-baseline">
        <Label className="mb-1 font-normal">{label}</Label>
        <p className="text-base font-medium text-gray-800 leading-5 break-all">
          {value}
        </p>
      </div>
    );
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 justify-items-auto mb-8">
        <DetailsBlock label="First Name" value={instructor.first_name} />
        <DetailsBlock label="Last Name" value={instructor.last_name} />
      </div>
      <div className="grid grid-cols-2 gap-4 justify-items-auto mb-8">
        <DetailsBlock label="Phone Number" value={instructor.phone_number} />
        <DetailsBlock label="Role" value={instructor.role} />
      </div>

      <div className="absolute bottom-0 left-0 w-full bg-white nui-pane--footer">
        <Button
          label="Edit Instructor"
          icon="ri-pencil-line"
          size="large"
          style="secondary"
          onClick={() => {
            setPaneMode("form");
            setPaneTitle("Edit Instructor");
          }}
        />
      </div>
    </div>
  );
}

export default Details;
