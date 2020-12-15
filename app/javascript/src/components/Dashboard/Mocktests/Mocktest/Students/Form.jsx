import React from "react";
import { Button, Toastr, Callout } from "neetoui";
import { Input } from "neetoui/formik";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { addStudent } from "apis/mocktests";

export default function StudentForm({
  onClose,
  mocktest,
  fetchSingleMocktest,
}) {
  const initialValues = {
    phone_number: "",
    is_paid: false,
  };

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = yup.object().shape({
    phone_number: yup
      .string()
      .required("Required *")
      .matches(phoneRegExp, "Phone number is not valid")
      .length(10, "Phone number must be 10 digits"),
  });

  const handleSubmit = async values => {
    const payload = {
      phone_number: "+91" + values.phone_number,
      is_paid: values.is_paid,
    };

    let response = await addStudent(mocktest.id, payload);
    Toastr.success(response.data.notice);
    fetchSingleMocktest();
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
              label="Enter the student Phone Number you want to add"
              type="number"
              id="phone_number"
              name="phone_number"
              prefix="+91"
              placeholder="Enter phone number"
              required
              autoFocus
              className="mt-6"
            />

            <Callout style="info" className="mt-6 leading-relaxed">
              If student already paid you, then please select below checkbox. So
              that student will be added to mocktest. If not selected, a SMS
              will be sent to the phone number with mocktest invitation code
            </Callout>

            <div className="mt-6">
              <Field type="checkbox" name="is_paid" className="form-checkbox" />
              <label className="ml-2">
                Is this student already paid for this mocktest
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
