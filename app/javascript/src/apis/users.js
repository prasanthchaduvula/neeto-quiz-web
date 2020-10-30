import axios from "axios";

export const signup = payload => axios.post("api/v1/users", payload);

export const getUser = userId => {
  return axios.get(`/api/v1/users/${userId}`);
};
