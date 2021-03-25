import axios from "axios";

const subdomain = window.location.host.split(".")[0];

export const login = payload => axios.post("api/v1/login", payload);

export const logout = () => axios.delete("api/v1/logout");

export const sendOtp = payload => axios.post("/api/v1/registrations", payload);

export const verifyOtp = payload =>
  axios.patch("/api/v1/registrations", payload);

export const sendOtpForLogin = payload => {
  return axios.post(`/api/v1/login/${subdomain}/sendotp`, payload);
};

export const verifyOtpForLogin = payload => {
  return axios.post(`/api/v1/login/${subdomain}/verifyotp`, payload);
};
