import React from "react";
import { Input } from "neetoui";

export default function Search({ searchValue, setSearchValue }) {
  return (
    <Input
      autoFocus
      prefix={<i className="text-base text-gray-400 ri-search-line" />}
      placeholder="Search"
      className="mb-6"
      name="searchValue"
      value={searchValue}
      onChange={e => setSearchValue(e.target.value)}
    />
  );
}
