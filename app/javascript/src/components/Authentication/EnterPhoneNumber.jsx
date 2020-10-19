import React from "react";

function EnterPhoneNumber(props) {
  return (
    <form
      className="w-full px-9 py-8 bg-white border rounded-lg shadow-sm simple_form"
      onSubmit={e => props.handlePhoneSubmit(e)}
    >
      <div className="form-control text-lg">
        <div className="md:flex items-center">
          <label className="mr-2" htmlFor="phoneNumber">
            Phone Number
          </label>
          <span className="text-gray-400 mr-1">+91</span>
          <input
            className="form-group  required user_"
            type="number"
            name="phoneNumber"
            onChange={e => props.setPhoneNumber(e.target.value)}
            value={props.phoneNumber}
            placeholder="Enter phone number"
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-4"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default EnterPhoneNumber;
