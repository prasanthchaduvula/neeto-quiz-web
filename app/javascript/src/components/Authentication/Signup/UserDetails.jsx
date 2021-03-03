import React from "react";
import { Button } from "neetoui";
import { Input } from "neetoui/formik";
import { Formik, Form } from "formik";
import * as yup from "yup";

function UserDetails({
  setPhonePage,
  setUserDetailsPage,
  setOrgPage,
  firstName,
  setFirstName,
  lastName,
  setLastName,
}) {
  const initialValues = {
    first_name: firstName,
    last_name: lastName,
  };

  const validationSchema = yup.object().shape({
    first_name: yup.string().required("Required *"),
    last_name: yup.string().required("Required *"),
  });

  const handleSubmit = async values => {
    setFirstName(values.first_name);
    setLastName(values.last_name);
    setUserDetailsPage(false);
    setOrgPage(true);
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
            <Input label="First Name" name="first_name" autoFocus />
            <Input label="Last Name" name="last_name" className="mt-6" />
            <div className="flex justify-between items-center mt-6">
              <Button
                label="Edit Phone Number"
                style="secondary"
                icon="ri-pencil-line"
                className="border-none text-sm leading-5 text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
                onClick={() => {
                  setPhonePage(true);
                  setUserDetailsPage(false);
                }}
              />
            </div>
            <Button
              label="Next"
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
export default UserDetails;
