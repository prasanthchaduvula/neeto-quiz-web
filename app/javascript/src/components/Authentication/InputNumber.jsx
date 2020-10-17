import React, { useState } from "react";
import { createOtp, verifyOtp } from "apis/authentication";

function InputNumber(props) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");

  const newRegistration = phonePayload => {
    createOtp(phonePayload).then(() => {
      props.changeType({ otp: true, phoneNumber: false });
    });
  };

  const verifyRegistration = otpPayload => {
    verifyOtp(otpPayload).then(response => {
      if (response.status == 200) {
        localStorage.setItem(
          "authToken",
          JSON.stringify(response.data.user.authentication_token)
        );
        localStorage.setItem(
          "authPhone",
          JSON.stringify(response.data.user.phone_number)
        );
        props.setUser(response.data.user.id);
      }
    });
  };

  const addIndianCallingCode = phoneNumber => "+91".concat(phoneNumber);
  const handleSubmit = event => {
    event.preventDefault();
    const phonePayload = {
      user: {
        phone_number: addIndianCallingCode(phoneNumber),
      },
    };
    if (props.inputType.phoneNumber) {
      newRegistration(phonePayload);
    } else {
      const otpPayload = {
        user: {
          phone_number: addIndianCallingCode(phoneNumber),
          otp,
        },
      };
      verifyRegistration(otpPayload);
    }
  };
  return (
    <div className="flex flex-grow wrapper ">
      <div className="container flex-col px-4 mx-auto">
        <div className="flex flex-col items-center justify-center flex-grow w-full h-full py-20 mx-auto lg:w-5/12">
          <form
            className="w-full px-10 py-8 bg-white border rounded-lg shadow-sm simple_form"
            onSubmit={handleSubmit}
          >
            {props.inputType.phoneNumber ? (
              <div className="form-control text-lg">
                <label className="mr-2" htmlFor="phoneNumber">
                  Phone Number
                </label>
                <input
                  className="mb-4 form-group  required user_"
                  type="number"
                  name="phoneNumber"
                  onChange={e => setPhoneNumber(e.target.value)}
                  value={phoneNumber}
                  placeholder="Enter your phone number"
                />
              </div>
            ) : (
              <>
                <div className="form-control text-lg">
                  <label className="mr-2" htmlFor="otp">
                    Enter OTP
                  </label>
                  <input
                    className="mb-4 form-group  required user_"
                    type="text"
                    name="otp"
                    onChange={e => setOtp(e.target.value)}
                    value={otp}
                    placeholder="Enter your otp"
                  />
                </div>
                <a
                  href="/signup"
                  className="bg-blue-500 text-white rounded mb-4 p-2"
                >
                  Edit phone number
                </a>
              </>
            )}
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default InputNumber;
