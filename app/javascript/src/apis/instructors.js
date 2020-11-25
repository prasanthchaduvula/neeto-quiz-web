import axios from "axios";

export const getInstructor = Id => {
  return axios.get(`/api/v1/instructors/${Id}`);
};
