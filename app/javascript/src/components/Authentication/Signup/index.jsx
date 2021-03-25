import React, { useState } from "react";
import { Toastr } from "neetoui";
import { sendOtp } from "apis/authentication";
import { createOrganization } from "apis/organizations";
import Otp from "./Otp";
import PhoneNumber from "./PhoneNumber";
import UserDetails from "./UserDetails";
import OrganizationDetails from "./OrganizationDetails";

function Signup() {
  const [phonePage, setPhonePage] = useState(true);
  const [otpPage, setOtpPage] = useState(false);
  const [userDetailsPage, setUserDetailsPage] = useState(false);
  const [orgPage, setOrgPage] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [orgName, setOrgName] = useState("");
  const [subdomain, setSubdomain] = useState("");
  const [submitBtnLoading, setSubmitBtnLoading] = useState(false);

  const sendOtpForSignup = async payload => {
    setSubmitBtnLoading(true);
    try {
      await sendOtp(payload);
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
      user: {
        phone_number: `+91${number}`,
      },
    };
    sendOtpForSignup(payload);
  };

  const handleOrganization = async (name, subdomain) => {
    setOrgName(name);
    setSubdomain(subdomain);
    const payload = {
      organization: {
        name: name,
        subdomain: subdomain,
      },
      user: {
        phone_number: `+91${phoneNumber}`,
        first_name: firstName,
        last_name: lastName,
      },
    };

    let response = await createOrganization(payload);
    Toastr.success(response.data.notice);
    window.location = response.data.redirect_url;
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
              <UserDetails
                setPhonePage={setPhonePage}
                setUserDetailsPage={setUserDetailsPage}
                setOrgPage={setOrgPage}
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
              />
            )}
            {orgPage && (
              <OrganizationDetails
                setPhonePage={setPhonePage}
                setUserDetailsPage={setUserDetailsPage}
                setOrgPage={setOrgPage}
                orgName={orgName}
                subdomain={subdomain}
                handleOrganization={handleOrganization}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default Signup;
