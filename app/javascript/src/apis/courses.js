import axios from "axios";

const coursesFetch = () => axios.get("/api/v1/courses");

const courseFetch = id => {
  return axios.get(`/api/v1/courses/${id}`);
};
export default {
  coursesFetch,
  courseFetch,
};
