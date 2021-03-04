import React, { useState } from "react";
import { Toastr } from "neetoui";
import { sendOtpForLogin } from "apis/authentication";
import UpdateUser from "./UpdateUser";
import Otp from "./Otp";
import PhoneNumber from "./PhoneNumber";

function Signin() {
  const [phonePage, setPhonePage] = useState(true);
  const [otpPage, setOtpPage] = useState(false);
  const [userDetailsPage, setUserDetailsPage] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [submitBtnLoading, setSubmitBtnLoading] = useState(false);

  const sendOtp = async payload => {
    setSubmitBtnLoading(true);
    try {
      await sendOtpForLogin(payload);
      Toastr.success("OTP sent successfully");
      setSubmitBtnLoading(false);
      setPhonePage(false);
      setOtpPage(true);
    } catch {
      setSubmitBtnLoading(false);
    }
  };

  const handlePhoneSubmit = number => {
    setPhoneNumber(number);
    const payload = {
      phone_number: `+91${number}`,
    };
    sendOtp(payload);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/v1/workflow-mark-on-white.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
            Welcome to NeetoAcademy
          </h2>
          <p className="mt-2 text-center text-sm leading-5 font-medium text-indigo-600 max-w">
            Start learning in your own time and space
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {phonePage && (
              <PhoneNumber
                handlePhoneSubmit={handlePhoneSubmit}
                phoneNumber={phoneNumber}
                submitBtnLoading={submitBtnLoading}
              />
            )}
            {otpPage && (
              <Otp
                handlePhoneSubmit={handlePhoneSubmit}
                setPhonePage={setPhonePage}
                setOtpPage={setOtpPage}
                setUserDetailsPage={setUserDetailsPage}
                phoneNumber={phoneNumber}
              />
            )}
            {userDetailsPage && (
              <UpdateUser
                setPhonePage={setPhonePage}
                setUserDetailsPage={setUserDetailsPage}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default Signin;
