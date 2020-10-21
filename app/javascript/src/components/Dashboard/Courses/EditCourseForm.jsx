import React, { useState, useEffect } from "react";
import { Button } from "nitroui";
import Axios from "axios";

export default function EditCourseForm(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(props.courseName);
    setDescription(props.courseDescription);
  }, [props.courseName, props.courseDescription]);

  const handleSubmit = e => {
    e.preventDefault();
    Axios.patch(`/api/v1/courses/${props.courseId}`, {
      course: {
        name,
        description,
      },
    }).then(() => {
      props.refetch();
      props.onClose();
    });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlor="name"
        >
          Name of the course
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Name"
          onChange={e => setName(e.target.value)}
          value={name}
        />
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Description"
          onChange={e => setDescription(e.target.value)}
          value={description}
        />
      </div>
      <div className="absolute bottom-0 left-0 w-full bg-white nui-pane--footer">
        <Button
          onClick={props.onClose}
          label="Cancel"
          size="large"
          style="secondary"
        />

        <Button
          type="submit"
          label="Submit"
          size="large"
          style="primary"
          className="ml-2"
        />
      </div>
    </form>
  );
}
