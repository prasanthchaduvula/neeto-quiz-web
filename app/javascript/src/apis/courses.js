import axios from "axios";

export const getCourses = () => {
  return axios.get("/api/v1/courses");
};

export const getCourse = id => {
  return axios.get(`/api/v1/courses/${id}`);
};

export const createCourse = payload => {
  return axios.post("/api/v1/courses", payload);
};

export const updateCourse = (id, payload) => {
  return axios.patch(`/api/v1/courses/${id}`, payload);
};

export const deleteCourse = id => {
  return axios.delete(`/api/v1/courses/${id}`);
};

export const addStudent = (id, payload) => {
  return axios.post(`/api/v1/courses/${id}/add_students`, payload);
};

export const publishCourse = (id, payload) => {
  return axios.patch(`/api/v1/publish/${id}`, payload);
};

export const getJoinCourse = invitation_code => {
  return axios.get(`/api/v1/join_courses/${invitation_code}`);
};
