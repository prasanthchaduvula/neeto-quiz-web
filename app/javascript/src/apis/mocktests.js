import axios from "axios";

export const getMocktests = () => {
  return axios.get("/api/v1/exam/mocktests");
};

export const getMocktest = id => {
  return axios.get(`/api/v1/exam/mocktests/${id}`);
};
export const createMocktest = payload => {
  return axios.post("/api/v1/exam/mocktests", payload);
};

export const updateMocktest = (id, payload) => {
  return axios.patch(`/api/v1/exam/mocktests/${id}`, payload);
};

export const deleteMocktest = id => {
  return axios.delete(`/api/v1/exam/mocktests/${id}`);
};
