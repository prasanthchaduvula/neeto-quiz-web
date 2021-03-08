import React from "react";
import { Button, Toastr } from "neetoui";
import { Input } from "neetoui/formik";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { verifyOtpForLogin } from "apis/authentication";
import { useAuthDispatch } from "contexts/auth";

function Otp({
  handlePhoneSubmit,
  setPhonePage,
  setOtpPage,
  setUserDetailsPage,
  phoneNumber,
}) {
  const authDispatch = useAuthDispatch();

  const initialValues = {
    otp: "",
  };

  const validationSchema = yup.object().shape({
    otp: yup
      .string()
      .required("Required *")
      .length(4, "OTP must be 4 digits"),
  });

  const handleSubmit = async values => {
    const payload = {
      phone_number: `+91${phoneNumber}`,
      otp: values.otp,
    };

    let response = await verifyOtpForLogin(payload);
    const {
      id,
      first_name,
      last_name,
      phone_number,
      authentication_token,
      role,
    } = {
      ...response.data.user,
    };

    Toastr.success("Verification successfull");

    authDispatch({
      type: "LOGIN",
      payload: {
        token: authentication_token,
        phoneNumber: phone_number,
        userId: id,
        orgId: response.data.organization.id,
        subdomain: response.data.organization.subdomain,
        role: role,
      },
    });

    if (first_name || last_name) {
      window.location.href = "/";
    } else {
      setOtpPage(false);
      setUserDetailsPage(true);
    }
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
            <Input
              label="OTP"
              type="number"
              name="otp"
              placeholder="Enter otp"
              autoFocus
            />
            <div className="flex justify-between items-center mt-6">
              <Button
                label="Edit Phone Number"
                style="secondary"
                icon="ri-pencil-line"
                className="border-none text-sm leading-5 text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
                onClick={() => {
                  setPhonePage(true);
                  setOtpPage(false);
                }}
              />
              <Button
                label="Resend OTP"
                style="secondary"
                icon="ri-send-plane-line"
                className="border-none text-sm leading-5 text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
                onClick={() => handlePhoneSubmit(phoneNumber)}
              />
            </div>
            <Button
              label="Login"
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
export default Otp;
