import React, { useEffect, useState } from "react";
import { Button } from "nitroui";
import CourseApi from "../../../apis/courses";
import { showToastr } from "../../../common";
export default function CourseForm(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  props.isCreateForm
    ? null
    : useEffect(() => {
        setName(props.courseName);
        setDescription(props.courseDescription);
        setPrice(props.coursePrice);
      }, [props.courseName, props.courseDescription, props.coursePrice]);

  const handleSubmit = e => {
    e.preventDefault();
    const payload = {
      course: {
        name,
        description,
        price,
      },
    };
    const sendRequest = payload => {
      return props.courseId
        ? CourseApi.updateCourse(props.courseId, payload)
        : CourseApi.createCourse(payload);
    };
    sendRequest(payload).then(response => {
      showToastr(
        "success",
        `${
          props.isCreateForm
            ? "Course added successfully"
            : "Course updated successfully"
        }`
      );
      if (props.isCreateForm) {
        props.refetch();
        props.onClose();
      } else {
        props.setCourse(response.data.course_details);
        props.onClose();
      }
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
          type="text"
          placeholder="Name"
          onChange={e => setName(e.target.value)}
          value={name}
          required
        />
      </div>
      <div className="mb-4">
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
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlor="name"
        >
          Price of the course(in rupees)
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          placeholder="Price"
          onChange={e => setPrice(e.target.value)}
          value={price}
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
