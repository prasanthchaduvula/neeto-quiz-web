import React from "react";
import { withRouter } from "react-router";

function Mocktests({ mocktests, history }) {
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
  );
}

export default withRouter(Mocktests);
