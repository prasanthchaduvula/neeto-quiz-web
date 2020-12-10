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

export const publishCourse = courseId => {
  return axios.put(`/api/v1/courses/${courseId}/publish`);
};

export const unpublishCourse = courseId => {
  return axios.put(`/api/v1/courses/${courseId}/unpublish`);
};

export const getJoinCourse = invitation_code => {
  return axios.get(`/api/v1/join_courses/${invitation_code}`);
};

export const joinCourse = courseId => {
  return axios.post(`/api/v1/courses/${courseId}/join_courses`);
};

export const exploreCourses = () => {
  return axios.get(`/api/v1/explore_courses`);
};

export const updateExploreCourse = (Id, payload) => {
  return axios.patch(`/api/v1/explore_courses/${Id}`, payload);
};
