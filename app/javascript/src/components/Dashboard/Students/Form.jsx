import React from "react";
import { Button, Toastr } from "neetoui";
import { Input } from "neetoui/formik";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { addStudent, updateStudent } from "apis/students";

export default function StudentsForm({ onClose, loadStudents, student }) {
  const initialValues = {
    firstName: student.first_name || "",
    lastName: student.last_name || "",
    phoneNumber: (student && student.phone_number.slice(3)) || "",
  };

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = yup.object().shape({
    phoneNumber: yup
      .string()
      .required("Required *")
      .matches(phoneRegExp, "Phone number is not valid")
      .length(10, "Phone number must be 10 digits"),
    firstName: yup.string().required("Required *"),
    lastName: yup.string().required("Required *"),
  });

  const handleSubmit = async values => {
    const payload = {
      student: {
        first_name: values.firstName,
        last_name: values.lastName,
        phone_number: "+91" + values.phoneNumber,
      },
    };

    const sendRequest = payload => {
      return student ? updateStudent(student.id, payload) : addStudent(payload);
    };

    let response = await sendRequest(payload);
    Toastr.success(response.data.notice);
    loadStudents();
    onClose();
  };

  return (
    <Formik
      validateOnBlur={false}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      {({ handleSubmit, isSubmitting }) => {
        return (
          <Form>
            <Input
              label="Phone Number"
              type="number"
              name="phoneNumber"
              autoFocus
              prefix="+91"
              placeholder="Enter phone number"
            />

            <Input label="First Name" name="firstName" className="mt-6" />
            <Input label="Last Name" name="lastName" className="mt-6" />
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
                loading={isSubmitting}
                onClick={handleSubmit}
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
