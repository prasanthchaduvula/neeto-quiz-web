import axios from "axios";

const subdomain = localStorage.getItem("authSubdomain");

export const getInstructor = Id => {
  return axios.get(`/api/v1/organizations/${subdomain}/instructors/${Id}`);
};

export const allInstructors = () => {
  return axios.get(`/api/v1/organizations/${subdomain}/instructors`);
};

export const addInstructor = payload => {
  return axios.post(`/api/v1/organizations/${subdomain}/instructors`, payload);
};

export const updateInstructor = (id, payload) => {
  return axios.patch(
    `/api/v1/organizations/${subdomain}/instructors/${id}`,
    payload
  );
};

export const activateInstructor = id => {
  return axios.put(
    `/api/v1/organizations/${subdomain}/instructors/${id}/activate`
  );
};

export const inactivateInstructor = id => {
  return axios.put(
    `/api/v1/organizations/${subdomain}/instructors/${id}/inactivate`
  );
};

export const getUnjoinedCourses = id => {
  return axios.get(
    `/api/v1/organizations/${subdomain}/instructors/${id}/unjoined_courses`
  );
};

export const joinCourse = (id, courseId) => {
  return axios.put(
    `/api/v1/organizations/${subdomain}/instructors/${id}/courses/${courseId}`
  );
};

export const getUnjoinedMocktests = id => {
  return axios.get(
    `/api/v1/organizations/${subdomain}/instructors/${id}/unjoined_mocktests`
  );
};

export const joinMocktest = (id, mocktestId) => {
  return axios.put(
    `/api/v1/organizations/${subdomain}/instructors/${id}/mocktests/${mocktestId}`
  );
};
