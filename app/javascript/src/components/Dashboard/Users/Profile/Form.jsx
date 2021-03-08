import React, { useState, useEffect } from "react";
import { PageLoader, Button, Toastr } from "neetoui";
import { Input } from "neetoui/formik";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { getUser, updateUser } from "apis/users";

export default function GeneralSettings() {
  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    const user_id = localStorage.getItem("authUserId");

    getUser(user_id).then(response => {
      setInitialValues(response.data.user);
      setLoading(false);
    });
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

    await updateUser(values.id, payload);
    Toastr.success("Profile updated successfully");
  };

  const onReset = () => Toastr.success("Form has been reset.");

  if (loading) {
    return <PageLoader />;
  } else {
    return (
      <Formik
        enableReinitialize
        validateOnBlur={false}
        initialValues={initialValues}
        onReset={onReset}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ handleReset, handleSubmit, dirty, isSubmitting }) => {
          return (
            <div className="h-full w-2/5">
              <Form>
                <div className="mt-10">
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <Input label="First Name" name="first_name" autoFocus />
                    <Input label="Last Name" name="last_name" />
                  </div>
                  <Input
                    label="Phone Number"
                    name="phone_number"
                    disabled
                    className="mb-6"
                  />
                </div>
                <div className="flex flex-row items-center justify-start mt-8">
                  <Button
                    style="primary"
                    label="Save Changes"
                    icon="ri-save-3-fill"
                    className="mr-4"
                    onClick={handleSubmit}
                    loading={isSubmitting}
                    dataTestId="save-changes-button"
                  />
                  <Button
                    style="secondary"
                    label="Reset changes"
                    disabled={!dirty || isSubmitting}
                    onClick={handleReset}
                    dataTestId="reset-changes-button"
                  />
                </div>
              </Form>
            </div>
          );
        }}
      </Formik>
    );
  }
}
