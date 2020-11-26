import React, { useState } from "react";
import { Toastr } from "neetoui";
import { createOtp } from "apis/authentication";
import UpdateUser from "./UpdateUser";
import EnterOtp from "./EnterOtp";
import EnterPhoneNumber from "./EnterPhoneNumber";

function Signup() {
  const [userPage, setUserPage] = useState(false);
  const [phonePage, setPhonePage] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");

  const newRegistration = phonePayload => {
    createOtp(phonePayload).then(() => {
      Toastr.success("OTP sent successfully");
      setPhonePage(false);
    });
  };

  const handlePhoneSubmit = number => {
    setPhoneNumber(number);
    const phonePayload = {
      user: {
        phone_number: `+91${number}`,
      },
    };
    newRegistration(phonePayload);
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
            {phonePage ? (
              <EnterPhoneNumber
                setPhonePage={setPhonePage}
                handlePhoneSubmit={handlePhoneSubmit}
                setPhoneNumber={setPhoneNumber}
                phoneNumber={phoneNumber}
              />
            ) : !userPage ? (
              <EnterOtp
                handlePhoneSubmit={handlePhoneSubmit}
                setPhonePage={setPhonePage}
                phoneNumber={phoneNumber}
                setUserPage={setUserPage}
              />
            ) : (
              <UpdateUser id={localStorage.getItem("user_id")} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default Signup;
