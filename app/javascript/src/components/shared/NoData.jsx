import React from "react";

export default function NoData({ message }) {
  return (
    <div
      className={`flex items-center justify-center p-4`}
      style={{ height: "75vh" }}
    >
      <h4 className="text-lg">{message} </h4>
    </div>
  );
}
