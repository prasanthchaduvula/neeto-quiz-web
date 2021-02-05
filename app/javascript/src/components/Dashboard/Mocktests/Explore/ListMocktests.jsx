import React, { useState } from "react";
import { Badge } from "neetoui";
import { withRouter } from "react-router-dom";
import ExplorMocktestPane from "./Pane";

function ListMocktests({ mocktests, history }) {
  const [exploreMocktestPane, setExploreMocktestPane] = useState(false);
  const [mocktest, setMocktest] = useState({});

  const NoData = () => {
    return (
      <div
        className="flex items-center justify-center"
        style={{ height: "60vh" }}
      >
        <h4 className="text-xl ">
          We do not have any published mocktests to show here.
        </h4>
      </div>
    );
  };

  return (
    <>
      {mocktests && mocktests.length ? (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 my-6">
          {mocktests.map(({ mocktest, creator }) => (
            <li
              className="col-span-1 bg-white rounded-lg shadow px-5 py-4"
              key={mocktest.id}
            >
              <p
                className="mt-1 text-lg font-semibold text-gray-900 truncate hover:text-indigo-600 cursor-pointer"
                onClick={() => {
                  mocktest.isMember
                    ? history.push(`/mocktests/${mocktest.id}`)
                    : setMocktest(mocktest);
                  setExploreMocktestPane(true);
                }}
              >
                {mocktest.name}
              </p>
              <div className="flex items-center mt-2">
                <p
                  className="text-sm text-gray-600 hover:text-indigo-600 cursor-pointer"
                  onClick={() => history.push(`/instructors/${creator.id}`)}
                >
                  Instructor: &nbsp;
                  <span>{creator.name}</span>
                </p>
                <Badge
                  color={mocktest.price ? "yellow" : "green"}
                  className="ml-4 text-sm"
                >
                  {mocktest.price ? `Rs ${mocktest.price}` : "Free"}
                </Badge>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <NoData />
      )}
      <ExplorMocktestPane
        showPane={exploreMocktestPane}
        setShowPane={setExploreMocktestPane}
        mocktest={mocktest}
      />
    </>
  );
}

export default withRouter(ListMocktests);
