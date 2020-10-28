import React from "react";
import { Button } from "nitroui";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { showToastr } from "common";
import { addStudent } from "apis/courses";

export default function StudentForm({ onClose, course, fetchSingleCourse }) {
  const initialValues = {
    phone_number: "",
    paid: false,
  };

  const validationSchema = yup.object().shape({
    phone_number: yup.string().required("Required *"),
  });

  const handleSubmit = values => {
    const payload = {
      phone_number: "+91" + values.phone_number,
      paid: values.paid,
    };

    addStudent(course.id, payload).then(response => {
      showToastr("success", response.data.notice);
      fetchSingleCourse();
      onClose();
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      {({ handleSubmit }) => {
        return (
          <Form>
            <div className="mb-4">
              <div className="form-control">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="phone_number"
                >
                  Enter the Student Phone Number you want to add
                </label>
                <ErrorMessage
                  name="phone_number"
                  component="div"
                  className="text-red-600"
                />
                <div className="md:flex items-center mt-2 ">
                  <span className="text-gray-500 mr-2">+91</span>
                  <Field
                    type="number"
                    id="phone_number"
                    name="phone_number"
                    className="border"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4">
              <Field type="checkbox" name="paid" className="form-checkbox" />
              <label className="ml-2">
                Is this student already paid for this course
              </label>
            </div>

            <div className="absolute bottom-0 left-0 w-full bg-white nui-pane--footer">
              <Button
                onClick={onClose}
                label="Cancel"
                size="large"
                style="secondary"
              />

              <Button
                label="Submit"
                size="large"
                style="primary"
                className="ml-2"
                onClick={handleSubmit}
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
