import React, { useEffect, useState } from "react";
import { PageLoader, Button, Callout, Toastr } from "nitroui";
import { Input, Radio } from "nitroui/formik";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { getPaymentDetails, createPaymentDetails } from "apis/users";

export default function PaymentDetails() {
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [initialValues, setInitialValues] = useState({
    ifsc: "",
    account_number: "",
    account_type: "savings",
    business_name: "",
    email_id: "",
  });

  useEffect(() => {
    loadPaymentDetails();
  }, []);

  const loadPaymentDetails = () => {
    getPaymentDetails().then(response => {
      setInitialValues({ ...initialValues, ...response.data.payment_details });
      setDisabled(true);
    });
    setLoading(false);
  };

  const validationSchema = yup.object().shape({
    ifsc: yup.string().required("Required *"),
    account_number: yup.string().required("Required *"),
    account_type: yup.string().required("Required *"),
    business_name: yup.string().required("Required *"),
    email_id: yup
      .string()
      .email("Invalid email format")
      .required("Required"),
  });

  const handleSubmit = async values => {
    const payload = {
      payment_details: {
        ifsc: values.ifsc,
        account_number: values.account_number,
        account_type: values.account_type,
        business_name: values.business_name,
        email_id: values.email_id,
      },
    };

    await createPaymentDetails(payload);
    Toastr.success("Profile updated successfully");
    loadPaymentDetails();
  };

  if (loading) {
    return <PageLoader />;
  } else {
    return (
      <Formik
        enableReinitialize
        validateOnBlur={false}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ handleReset, handleSubmit, dirty, isSubmitting }) => {
          return (
            <div className="h-full w-2/5 mt-10">
              <Callout style="warning" className="mb-4">
                After saving bank account details, you can not edit them
              </Callout>
              <Form>
                <Input
                  label="IFSC code"
                  required
                  name="ifsc"
                  className="mb-6"
                  disabled={disabled}
                />
                <Input
                  label="Account Number"
                  required
                  type="number"
                  name="account_number"
                  className="mb-6"
                  disabled={disabled}
                />
                <Radio
                  className="mb-6"
                  label="Account Type"
                  required
                  name="account_type"
                  disabled={disabled}
                  options={[
                    {
                      label: "Savings",
                      value: "savings",
                    },
                    {
                      label: "Current",
                      value: "current",
                    },
                  ]}
                />
                <Input
                  label="Business Name"
                  required
                  name="business_name"
                  className="mb-6"
                  disabled={disabled}
                />
                <Input
                  label="Email"
                  required
                  type="email"
                  name="email_id"
                  disabled={disabled}
                />
                <p className="mt-2 mb-4 text-sm leading-relaxed text-gray-500">
                  The email address will be used for registering the account on
                  Razorpay.
                </p>
                {!initialValues.account_number && (
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
                )}
              </Form>
            </div>
          );
        }}
      </Formik>
    );
  }
}
