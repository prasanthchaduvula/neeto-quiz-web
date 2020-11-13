import React from "react";
import { Button } from "nitroui";
import { Input } from "nitroui/formik";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { showToastr } from "common";
import { updateUser } from "apis/users";

function UpdateUser(props) {
  const initialValues = {
    first_name: "",
    last_name: "",
  };

  const validationSchema = yup.object().shape({
    first_name: yup.string().required("Required *"),
    last_name: yup.string().required("Required *"),
  });

  const handleSubmit = values => {
    const payload = {
      user: {
        first_name: values.first_name,
        last_name: values.last_name,
      },
    };

    updateUser(props.id, payload).then(() => {
      showToastr("success", "Profile updated successfully");
      window.location.href = "/dashboard";
    });
  };

  return (
    <Formik
      validateOnBlur={false}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => {
        return (
          <Form>
            <Input label="First Name" name="first_name" />
            <Input label="Last Name" name="last_name" className="mt-6" />
            <Button
              label="Submit"
              size="large"
              style="primary"
              fullWidth
              className="mt-6 text-center text-base font-medium"
              onClick={handleSubmit}
            />
          </Form>
        );
      }}
    </Formik>
  );
}
export default UpdateUser;
