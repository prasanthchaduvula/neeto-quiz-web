import axios from "axios";

export const getCourses = () => axios.get("/api/v1/courses");

export const getCourse = id => {
  return axios.get(`/api/v1/courses/${id}`);
};

export const createCourse = payload => axios.post("/api/v1/courses", payload);

export const updateCourse = (id, payload) =>
  axios.patch(`/api/v1/courses/${id}`, payload);

export const deleteCourse = id => axios.delete(`/api/v1/courses/${id}`);

export default {
  deleteCourse,
};
