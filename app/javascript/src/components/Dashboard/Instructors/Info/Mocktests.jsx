import React from "react";
import { withRouter } from "react-router";
import { Button } from "neetoui";

function Mocktests({ mocktests, setPaneMode, setPaneTitle, history }) {
  const MocktestBlock = ({ name, id }) => {
    return (
      <p
        className="mt-6 bg-white rounded-lg shadow px-5 py-4 text-base font-normal text-black truncate hover:text-indigo-600 hover:font-semibold cursor-pointer"
        onClick={() => history.push(`/mocktests/${id}`)}
      >
        {name}
      </p>
    );
  };

  return (
    <div>
      <div className="mt-4 pb-20">
        {mocktests && mocktests.length ? (
          mocktests.map(({ mocktest }) => (
            <MocktestBlock
              key={mocktest.id}
              name={mocktest.name}
              id={mocktest.id}
            />
          ))
        ) : (
          <p className="text-center mt-20 text-base font-normal text-gray-900 truncate ">
            No mocktests for this instructor
          </p>
        )}
      </div>
      <div className="absolute bottom-0 left-0 w-full bg-white nui-pane--footer">
        <Button
          label="Access To Unjoined Mocktests"
          icon="ri-file-list-3-line"
          size="large"
          style="secondary"
          onClick={() => {
            setPaneMode("unjoined mocktests");
            setPaneTitle("Access To Unjoined Mocktests");
          }}
        />
      </div>
    </div>
  );
}

export default withRouter(Mocktests);
