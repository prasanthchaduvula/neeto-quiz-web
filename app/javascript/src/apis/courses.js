import axios from "axios";

export const courseFetch = () => {
  const token = JSON.parse(localStorage.getItem("authToken"));
  const phone = JSON.parse(localStorage.getItem("authPhone"));
  return axios.get("/api/v1/courses", {
    headers: {
      "X-Auth-Phone": phone,
      "X-Auth-Token": token,
    },
  });
};
