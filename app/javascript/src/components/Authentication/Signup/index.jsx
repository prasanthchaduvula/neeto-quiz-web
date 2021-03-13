import React, { useState } from "react";
import { Toastr } from "neetoui";
import { createOtp } from "apis/authentication";
import { createOrganization } from "apis/organizations";
import Otp from "./Otp";
import PhoneNumber from "./PhoneNumber";
import UserDetails from "./UserDetails";
import OrganizationDetails from "./OrganizationDetails";
import { useAuthDispatch } from "contexts/auth";

function Signup() {
  const authDispatch = useAuthDispatch();

  const [phonePage, setPhonePage] = useState(true);
  const [otpPage, setOtpPage] = useState(false);
  const [userDetailsPage, setUserDetailsPage] = useState(false);
  const [orgPage, setOrgPage] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [orgName, setOrgName] = useState("");
  const [subdomain, setSubdomain] = useState("");
  const [loading, setLoading] = useState(false);

  const sendOtp = phonePayload => {
    createOtp(phonePayload).then(() => {
      Toastr.success("OTP sent successfully");
      setLoading(false);
      setPhonePage(false);
      setOtpPage(true);
    });
  };

  const handlePhoneSubmit = number => {
    setPhoneNumber(`+91${number}`);
    const phonePayload = {
      user: {
        phone_number: `+91${number}`,
      },
    };
    sendOtp(phonePayload);
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
        phone_number: phoneNumber,
        first_name: firstName,
        last_name: lastName,
      },
    };

    let response = await createOrganization(payload);
    Toastr.success(response.data.notice);
    const { id, phone_number, authentication_token, role } = {
      ...response.data.user,
    };

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

    window.location.href = "/";
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
                setPhonePage={setPhonePage}
                handlePhoneSubmit={handlePhoneSubmit}
                setPhoneNumber={setPhoneNumber}
                phoneNumber={phoneNumber}
                loading={loading}
                setLoading={setLoading}
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
