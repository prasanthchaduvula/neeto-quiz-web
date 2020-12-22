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

export const publishMocktest = mocktestId => {
  return axios.put(`/api/v1/exam/mocktests/${mocktestId}/publish`);
};

export const unpublishMocktest = mocktestId => {
  return axios.put(`/api/v1/exam/mocktests/${mocktestId}/unpublish`);
};

export const addStudent = (mocktestId, payload) => {
  return axios.post(
    `/api/v1/exam/mocktests/${mocktestId}/add_students`,
    payload
  );
};

export const createAttempt = (mocktestId, payload) => {
  return axios.post(`/api/v1/exam/mocktests/${mocktestId}/attempts`, payload);
};

export const getAttempt = (mocktestId, attemptId) => {
  return axios.get(
    `/api/v1/exam/mocktests/${mocktestId}/attempts/${attemptId}`
  );
};
