import axios from "axios";

const subdomain = localStorage.getItem("authSubdomain");

export const getInstructor = Id => {
  return axios.get(`/api/v1/instructors/${Id}`);
};

export const allInstructors = () => {
  return axios.get(`/api/v1/organizations/${subdomain}/instructors`);
};

export const addInstructor = payload => {
  return axios.post(
    `/api/v1/organizations/${subdomain}/instructors/add`,
    payload
  );
};
