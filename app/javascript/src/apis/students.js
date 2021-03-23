import axios from "axios";

const subdomain = localStorage.getItem("authSubdomain");

export const getStudent = Id => {
  return axios.get(`/api/v1/organizations/${subdomain}/students/${Id}`);
};

export const allStudents = () => {
  return axios.get(`/api/v1/organizations/${subdomain}/students`);
};

export const addStudent = payload => {
  return axios.post(`/api/v1/organizations/${subdomain}/students`, payload);
};

export const updateStudent = (id, payload) => {
  return axios.patch(
    `/api/v1/organizations/${subdomain}/students/${id}`,
    payload
  );
};

export const getUnjoinedCourses = id => {
  return axios.get(
    `/api/v1/organizations/${subdomain}/students/${id}/unjoined_courses`
  );
};

export const getUnjoinedMocktests = id => {
  return axios.get(
    `/api/v1/organizations/${subdomain}/students/${id}/unjoined_mocktests`
  );
};

export const activateStudent = id => {
  return axios.put(
    `/api/v1/organizations/${subdomain}/students/${id}/activate`
  );
};

export const inactivateStudent = id => {
  return axios.put(
    `/api/v1/organizations/${subdomain}/students/${id}/inactivate`
  );
};
