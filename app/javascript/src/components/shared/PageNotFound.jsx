import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div>
      <div className="h-screen w-screen bg-blue-400 flex justify-center content-center flex-wrap">
        <h1 className="font-sans font-bold text-white text-6xl">404</h1>
      </div>

      <div className="absolute w-screen bottom-0 mb-6 text-white text-center font-sans text-xl">
        <span className="opacity-50">Take me back to</span>
        <Link className="border-b" to="/">
          Home Page
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
