import React from "react";
import { Button, Toastr } from "nitroui";
import { Input } from "nitroui/formik";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { verifyOtp } from "apis/authentication";

function EnterOtp(props) {
  const initialValues = {
    otp: "",
  };

  const verifyRegistration = otpPayload => {
    verifyOtp(otpPayload).then(response => {
      const {
        id,
        first_name,
        last_name,
        phone_number,
        authentication_token,
      } = {
        ...response.data.user,
      };
      Toastr.success("Verification successfull");
      localStorage.setItem("authToken", JSON.stringify(authentication_token));
      localStorage.setItem("authPhone", JSON.stringify(phone_number));
      localStorage.setItem("user_id", id);
      if (first_name || last_name) {
        window.location.href = "/";
      } else {
        props.setUserPage(true);
      }
    });
  };

  const validationSchema = yup.object().shape({
    otp: yup
      .string()
      .required("Required *")
      .length(4, "OTP must be 4 digits"),
  });

  const handleSubmit = values => {
    const otpPayload = {
      user: {
        phone_number: `+91${props.phoneNumber}`,
        otp: values.otp,
      },
    };
    verifyRegistration(otpPayload);
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
                onClick={() => props.setPhonePage(true)}
              />
              <Button
                label="Resend OTP"
                style="secondary"
                icon="ri-send-plane-line"
                className="border-none text-sm leading-5 text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
                onClick={() => props.handlePhoneSubmit(props.phoneNumber)}
              />
            </div>
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
export default EnterOtp;
