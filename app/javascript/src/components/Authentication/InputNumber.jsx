import React, { useState } from "react";
import { createOtp, verifyOtp } from "apis/authentication";

function InputNumber(props) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState({ first_name: "", last_name: "" });

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
    <form
      className="w-full px-10 py-8 bg-white border rounded-lg shadow-sm simple_form"
      onSubmit={handleSubmit}
    >
      {props.inputType.phoneNumber ? (
        <div className="form-control">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            className="mb-4 form-group email required user_email"
            type="number"
            name="phoneNumber"
            onChange={e => setPhoneNumber(e.target.value)}
            value={phoneNumber}
            placeholder="Enter your phone number"
          />
        </div>
      ) : props.inputType.otp ? (
        <div className="form-control">
          <label htmlFor="otp">Enter OTP</label>
          <input
            className="mb-4 form-group email required user_email"
            type="text"
            name="otp"
            onChange={e => setOtp(e.target.value)}
            value={otp}
            placeholder="Enter your otp"
          />
        </div>
      ) : (
        <>
          <div className="form-control">
            <label htmlFor="phoneNumber">Enter First name</label>
            <input
              className="mb-4 form-group  required "
              type="text"
              name="first_name"
              onChange={e => setName({ ...name, first_name: e.target.value })}
              value={name.first_name}
              placeholder="First Name"
            />
          </div>
          <div className="form-control">
            <label htmlFor="phoneNumber">Enter Last name</label>
            <input
              className="mb-4 form-group  required "
              type="text"
              name="last_name"
              onChange={e => setName({ ...name, last_name: e.target.value })}
              value={name.last_name}
              placeholder="Last Name"
            />
          </div>
        </>
      )}
      <button type="submit">Submit</button>
    </form>
  );
}

export default InputNumber;
