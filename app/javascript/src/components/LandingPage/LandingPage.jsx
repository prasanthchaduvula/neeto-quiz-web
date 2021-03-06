import React from "react";

function LandingPage() {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="lg:text-center">
          <h3 className="mt-2 text-3xl leading-8 font-extrabold text-purple-600 tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
            Welcome to NitroAcademy
          </h3>
          <p className="my-4 max-w-2xl text-xl leading-7 text-gray-500 lg:mx-auto text-blue-600">
            Start learning in your own time and space
          </p>
          <a
            href="/signin"
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
          >
            Signin
          </a>
        </div>
      </div>
    </div>
  );
}
export default LandingPage;
