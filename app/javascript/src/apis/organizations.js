import axios from "axios";

const subdomain = localStorage.getItem("authSubdomain");

export const createOrganization = payload => {
  return axios.post("/api/v1/server/organizations", payload);
};

export const getOrganization = () => {
  return axios.get(`/api/v1/server/organizations/${subdomain}`);
};

export const updateOrganization = payload => {
  return axios.patch(`/api/v1/server/organizations/${subdomain}`, payload);
};

export const createPaymentDetails = payload => {
  return axios.post(
    `/api/v1/organizations/${subdomain}/payment_details`,
    payload
  );
};

export const getPaymentDetails = () => {
  return axios.get(`/api/v1/organizations/${subdomain}/payment_details`);
};
