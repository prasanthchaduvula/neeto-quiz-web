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
