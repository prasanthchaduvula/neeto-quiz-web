import React, { useState, useEffect } from "react";
import { PageLoader, Button } from "nitroui";
import { Input } from "nitroui/formik";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { showToastr } from "common";
import { getUser, updateUser } from "apis/users";

export default function GeneralSettings() {
  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    const user_id = localStorage.getItem("user_id");

    getUser(user_id).then(response => {
      setInitialValues(response.data.user);
      setLoading(false);
    });
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
    updateUser(values.id, payload).then(() => {
      showToastr("success", "Profile updated successfully");
    });
  };

  const onReset = () => showToastr("success", "Form has been reset.");

  if (loading) {
    return <PageLoader />;
  } else {
    return (
      <Formik
        enableReinitialize
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
