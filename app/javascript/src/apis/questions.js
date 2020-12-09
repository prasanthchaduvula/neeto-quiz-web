import axios from "axios";

export const createQuestion = (mocktestId, payload) => {
  return axios.post(`/api/v1/exam/mocktests/${mocktestId}/questions`, payload);
};

export const updateQuestion = (mocktestId, payload, questionId) => {
  return axios.patch(
    `/api/v1/exam/mocktests/${mocktestId}/questions/${questionId}`,
    payload
  );
};

export const deleteQuestion = (mocktestId, questionId) => {
  return axios.delete(
    `/api/v1/exam/mocktests/${mocktestId}/questions/${questionId}`
  );
};
