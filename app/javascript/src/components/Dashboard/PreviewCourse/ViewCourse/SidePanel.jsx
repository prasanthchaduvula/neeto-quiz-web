import React from "react";

export default function SidePanel({ showPanel, setSidepanel }) {
  return showPanel ? (
    <div className="w-1/3 h-screen bg-gray-700">
      <div className="flex bg-white justify-between items-center nui-header border-none">
        <button className="p-2 pb-0 text-xl">
          <i className="ri-arrow-left-line"></i>
        </button>
        <p>Table Of Contents</p>
        <button
          className="p-2 text-xl pb-0"
          onClick={() => {
            setSidepanel(false);
          }}
        >
          <i className="ri-menu-line"></i>
        </button>
      </div>
    </div>
  ) : (
    <div className="flex items-start mt-7">
      <button
        className="p-2 text-xl pb-0"
        onClick={() => {
          setSidepanel(true);
        }}
      >
        <i className="ri-menu-line"></i>
      </button>
    </div>
  );
}
