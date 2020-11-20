import React from "react";
import { Button, Toastr } from "nitroui";
import { Input } from "nitroui/formik";
import { Formik, Form } from "formik";
import * as yup from "yup";
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

  const handleSubmit = async values => {
    const payload = {
      user: {
        first_name: values.first_name,
        last_name: values.last_name,
      },
    };

    await updateUser(props.id, payload);
    Toastr.success("Profile updated successfully");
    window.location.href = "/dashboard";
  };

  return (
    <Formik
      validateOnBlur={false}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, isSubmitting }) => {
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
              loading={isSubmitting}
              onClick={handleSubmit}
            />
          </Form>
        );
      }}
    </Formik>
  );
}
export default UpdateUser;
