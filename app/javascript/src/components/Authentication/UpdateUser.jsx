import Axios from "axios";
import React, { useState } from "react";

function UpdateUser(props) {
  const [name, setName] = useState({ first_name: "", last_name: "" });
  const handleSubmit = event => {
    event.preventDefault();
    let { first_name, last_name } = name;
    Axios.patch(`/api/v1/users/${props.id}`, {
      user: {
        first_name,
        last_name,
      },
    }).then(() => {
      window.location.href = "/dashboard";
    });
  };
  return (
    <form
      className="w-full px-10 py-8 bg-white border rounded-lg shadow-sm simple_form"
      onSubmit={handleSubmit}
    >
      <div className="form-control text-lg">
        <label className="mr-2" htmlFor="phoneNumber">
          First Name
        </label>
        <input
          className="mb-4 form-group email required user_email"
          type="text"
          name="first_name"
          onChange={e => setName({ ...name, first_name: e.target.value })}
          value={name.first_name}
          placeholder="Enter your First name"
        />
      </div>
      <div className="form-control text-lg">
        <label className="mr-2" htmlFor="phoneNumber">
          Last Name
        </label>
        <input
          className="mb-4 form-group email required user_email"
          type="text"
          name="last_name"
          onChange={e => setName({ ...name, last_name: e.target.value })}
          value={name.last_name}
          placeholder="Enter your Last name"
        />
      </div>
      <button
        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}
export default UpdateUser;
