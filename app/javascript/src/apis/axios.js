import axios from "axios";
import { Toastr } from "nitroui";

axios.defaults.baseURL = "/";
axios.defaults.headers = {
  Accept: "applicaion/json",
  "Content-Type": "application/json",
  "X-CSRF-TOKEN": document.querySelector('[name="csrf-token"]').content,
};

const handleRequest = config => {
  const token = JSON.parse(localStorage.getItem("authToken"));
  const phone = JSON.parse(localStorage.getItem("authPhone"));
  if (token && phone) {
    config.headers["X-Auth-Phone"] = phone;
    config.headers["X-Auth-Token"] = token;
  }
  return config;
};

const handleSuccessResponse = response => {
  return response;
};

const handleErrorResponse = (error, authDispatch) => {
  if (error.response?.status === 401) {
    authDispatch({ type: "LOGOUT" });
    Toastr.error(error.response?.data?.error);
  } else if (error.response?.data?.errors) {
    error.response.data.errors.map(error => {
      Toastr.error(error);
    });
  } else {
    Toastr.error(error.response?.data?.error || error.message);
  }
  return Promise.reject(error);
};

export const registerRequestIntercept = () => {
  axios.interceptors.request.use(handleRequest);
};

export const registerResponseIntercept = authDispatch => {
  axios.interceptors.response.use(handleSuccessResponse, error =>
    handleErrorResponse(error, authDispatch)
  );
};
