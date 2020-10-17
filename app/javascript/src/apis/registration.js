import axios from "axios";

export const newRegistration = payload => {
  return axios.post("/api/v1/registrations", payload);
};
