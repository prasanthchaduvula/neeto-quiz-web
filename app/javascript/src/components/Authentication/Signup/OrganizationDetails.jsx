import React from "react";
import { Button } from "neetoui";
import { Input } from "neetoui/formik";
import { Formik, Form } from "formik";
import * as yup from "yup";

function OrganizationDetails({
  setPhonePage,
  setUserDetailsPage,
  setOrgPage,
  orgName,
  subdomain,
  handleOrganization,
}) {
  const initialValues = {
    name: orgName,
    subdomain: subdomain,
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required("Required *"),
    subdomain: yup.string().required("Required *"),
  });

  const handleSubmit = async values => {
    handleOrganization(values.name, values.subdomain);
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
            <Input label="Organization Name" name="name" autoFocus />
            <Input label="Unique Subdomain" name="subdomain" className="mt-6" />
            <div className="flex justify-between items-center mt-6">
              <Button
                label="Edit Phone Number"
                style="secondary"
                icon="ri-pencil-line"
                className="border-none text-sm leading-5 text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
                onClick={() => {
                  setOrgPage(false);
                  setPhonePage(true);
                }}
              />
              <Button
                label="Edit User Details"
                style="secondary"
                icon="ri-pencil-line"
                className="border-none text-sm leading-5 text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
                onClick={() => {
                  setOrgPage(false);
                  setUserDetailsPage(true);
                }}
              />
            </div>
            <Button
              label="Create Organization"
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
export default OrganizationDetails;
