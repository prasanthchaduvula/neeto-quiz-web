import React, { useEffect, useState } from "react";
import { Button, PageLoader, Switch, Toastr } from "neetoui";
import { getUnjoinedMocktests, joinMocktest } from "apis/instructors";
import Search from "shared/Search";

function UnjoinedMocktests({ instructor, setPaneMode, setPaneTitle }) {
  const [loading, setLoading] = useState(true);
  const [mocktests, setMocktests] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    loadMocktests();
  }, []);

  const loadMocktests = async () => {
    let response = await getUnjoinedMocktests(instructor.id);
    setMocktests(response.data.mocktests);
    setLoading(false);
  };

  const joinSingleMocktest = async mocktestId => {
    let response = await joinMocktest(instructor.id, mocktestId);
    Toastr.success(response.data.notice);
    loadMocktests();
  };

  const MocktestBlock = ({ name, id }) => {
    return (
      <div className="flex justify-between mt-6 bg-white rounded-lg shadow px-5 py-4 hover:shadow-md">
        <p className="text-base font-normal text-black truncate">{name}</p>
        <Switch onChange={() => joinSingleMocktest(id)} />
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center">
        <PageLoader />
      </div>
    );
  }

  return (
    <div>
      <div className="mt-4 pb-20">
        {mocktests && mocktests.length ? (
          <>
            <Search searchValue={searchValue} setSearchValue={setSearchValue} />
            {searchValue
              ? mocktests.map(
                  ({ mocktest }) =>
                    mocktest.name.toLowerCase().includes(searchValue) && (
                      <MocktestBlock
                        key={mocktest.id}
                        name={mocktest.name}
                        id={mocktest.id}
                      />
                    )
                )
              : mocktests.map(({ mocktest }) => (
                  <MocktestBlock
                    key={mocktest.id}
                    name={mocktest.name}
                    id={mocktest.id}
                  />
                ))}
          </>
        ) : (
          <p className="text-center mt-20 text-base font-normal text-gray-900 truncate ">
            Instructor already joined all the published mocktests of this
            organization
          </p>
        )}
      </div>
      <div className="absolute bottom-0 left-0 w-full bg-white nui-pane--footer">
        <Button
          label="Go Back To Info"
          icon="ri-book-open-line"
          size="large"
          style="secondary"
          onClick={() => {
            setPaneMode("info");
            setPaneTitle("Info");
          }}
        />
      </div>
    </div>
  );
}

export default UnjoinedMocktests;
