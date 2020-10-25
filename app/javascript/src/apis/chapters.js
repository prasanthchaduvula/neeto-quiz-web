import axios from "axios";

export const createChapter = (courseId, payload) => {
  return axios.post(`/api/v1/courses/${courseId}/chapters`, payload);
};
