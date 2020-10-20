import React, { useState } from "react";

import { createOtp } from "apis/authentication";
import { Toastr } from "../../common";
import UpdateUser from "./UpdateUser";
import EnterOtp from "./EnterOtp";
import EnterPhoneNumber from "./EnterPhoneNumber";

function Signup() {
  const [userPage, setUserPage] = useState(false);
  const [phonePage, setPhonePage] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");

  const newRegistration = phonePayload => {
    if (phoneNumber && phoneNumber.length == 10) {
      createOtp(phonePayload).then(() => {
        Toastr.success("OTP sent successfully");
        setTimeout(() => {
          setPhonePage(false);
        }, 1000);
      });
    } else {
      Toastr.error("Please enter a valid phone number");
    }
  };

  const addIndianCallingCode = phoneNumber => "+91".concat(phoneNumber);

  const handlePhoneSubmit = event => {
    event.preventDefault();
    const phonePayload = {
      user: {
        phone_number: addIndianCallingCode(phoneNumber),
      },
    };
    newRegistration(phonePayload);
  };

  return (
    <>
      <div className="py-12">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="lg:text-center">
            <h3 className="mt-2 text-2xl leading-8 font-bold text-black-300 tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
              NitroAcademy
            </h3>
            <p className="my-4 max-w-2xl text-xl leading-7 text-gray-500 lg:mx-auto">
              Start learning in your own time and space
            </p>
          </div>
        </div>

        <div className="flex flex-grow wrapper">
          <div className="container flex-col px-4 mx-auto">
            <div className="flex flex-col items-center justify-center flex-grow w-full h-full py-5 mx-auto lg:w-5/12">
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
                <UpdateUser id={JSON.parse(localStorage.getItem("user_id"))} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Signup;
