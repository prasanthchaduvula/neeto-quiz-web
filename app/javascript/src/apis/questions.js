import axios from "axios";

export const createQuestion = (mocktestId, payload) => {
  return axios.post(`/api/v1/exam/mocktests/${mocktestId}/questions`, payload);
};
