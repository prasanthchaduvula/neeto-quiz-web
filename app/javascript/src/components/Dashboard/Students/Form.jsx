import React from "react";
import { Button } from "nitroui";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

export default function StudentForm({ onClose }) {
  const initialValues = {
    phone_number: "",
    paid: "",
  };

  const validationSchema = yup.object().shape({
    phone_number: yup.string().required("Required *"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      {({ handleSubmit }) => {
        return (
          <Form>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlor="name"
              >
                Phone number
              </label>
              <ErrorMessage
                name="phone_number"
                component="div"
                className="text-red-600"
              />
              <Field
                type="text"
                id="phone_number"
                name="phone_number"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
              />
            </div>

            <div className="mb-4">
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
