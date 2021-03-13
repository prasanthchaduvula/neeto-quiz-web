import React, { useState, useEffect } from "react";
import { PageLoader, Button, Toastr } from "neetoui";
import { Input } from "neetoui/formik";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { getOrganization, updateOrganization } from "apis/organizations";

export default function OrganizationDetails() {
  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    loadOrganization();
  }, []);

  const loadOrganization = async () => {
    let response = await getOrganization();
    setInitialValues(response.data.organization);
    setLoading(false);
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required("Required *"),
    subdomain: yup.string().required("Required *"),
  });

  const handleSubmit = async values => {
    const payload = {
      organization: {
        name: values.name,
        subdomain: values.subdomain,
      },
    };
    let response = await updateOrganization(payload);
    Toastr.success(response.data.notice);
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
                  <Input label="Organization Name" name="name" autoFocus />
                  <Input
                    label="Unique Subdomain"
                    name="subdomain"
                    className="mt-6"
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
