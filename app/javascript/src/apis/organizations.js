import axios from "axios";

export const createOrganization = payload => {
  return axios.post("/api/v1/server/organizations", payload);
};
