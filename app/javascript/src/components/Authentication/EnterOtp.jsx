import React, { useState } from "react";
import { verifyOtp } from "../../apis/authentication";

function EnterOtp(props) {
  const [otp, setOtp] = useState("");

  const verifyRegistration = otpPayload => {
    verifyOtp(otpPayload).then(response => {
      localStorage.setItem(
        "authToken",
        JSON.stringify(response.data.user.authentication_token)
      );
      localStorage.setItem(
        "authPhone",
        JSON.stringify(response.data.user.phone_number)
      );
      localStorage.setItem("user_id", JSON.stringify(response.data.user.id));
      if (response.data.user.first_name || response.data.user.last_name) {
        window.location.href = "/dashboard";
      } else {
        props.setUserPage(true);
      }
    });
  };

  const addIndianCallingCode = phoneNumber => "+91".concat(phoneNumber);

  const handleOtpSubmit = event => {
    event.preventDefault();
    const otpPayload = {
      user: {
        phone_number: addIndianCallingCode(props.phoneNumber),
        otp,
      },
    };
    verifyRegistration(otpPayload);
  };

  return (
    <form
      className="w-full px-10 py-8 bg-white border rounded-lg shadow-sm simple_form"
      onSubmit={handleOtpSubmit}
    >
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
      <div className="flex">
        <button
          className="bg-purple-500 font-bold mr-2 text-white rounded mb-4 p-2"
          onClick={() => props.setPhonePage(true)}
        >
          Edit phone number
        </button>
        <button
          className="bg-purple-500 font-bold text-white rounded mb-4 p-2"
          onClick={e => props.handlePhoneSubmit(e)}
        >
          Resend OTP
        </button>
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-4"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
export default EnterOtp;
