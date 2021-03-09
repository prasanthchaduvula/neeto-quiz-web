import axios from "axios";

const subdomain = localStorage.getItem("authSubdomain");

export const allStudents = () => {
  return axios.get(`/api/v1/organizations/${subdomain}/students`);
};

export const addStudent = payload => {
  return axios.post(`/api/v1/organizations/${subdomain}/students`, payload);
};
