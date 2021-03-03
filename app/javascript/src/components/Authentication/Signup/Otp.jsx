import React from "react";
import { Button, Toastr } from "neetoui";
import { Input } from "neetoui/formik";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { verifyOtp } from "apis/authentication";

function Otp({
  handlePhoneSubmit,
  setPhonePage,
  setOtpPage,
  setUserDetailsPage,
  phoneNumber,
}) {
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
    const otpPayload = {
      user: {
        phone_number: `+91${phoneNumber}`,
        otp: values.otp,
      },
    };

    let response = await verifyOtp(otpPayload);
    if (response.data.notice == "Verified") {
      Toastr.success("Verification successfull");
      setOtpPage(false);
      setUserDetailsPage(true);
    } else {
      Toastr.success("Verification failed");
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
              label="Verify"
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
