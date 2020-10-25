import axios from "axios";

const coursesFetch = () => axios.get("/api/v1/courses");

const fetchCourse = id => {
  return axios.get(`/api/v1/courses/${id}`);
};

export const createCourse = payload => axios.post("/api/v1/courses", payload);

export const updateCourse = (id, payload) =>
  axios.patch(`/api/v1/courses/${id}`, payload);

const deleteCourse = id => axios.delete(`/api/v1/courses/${id}`);

export default {
  coursesFetch,
  fetchCourse,
  deleteCourse,
};
