import axios from "axios";

export const signup = payload => axios.post("api/v1/users", payload);

export const getUser = userId => {
  return axios.get(`/api/v1/users/${userId}`);
};

export const updateUser = (userId, payload) => {
  return axios.patch(`/api/v1/users/${userId}`, payload);
};
