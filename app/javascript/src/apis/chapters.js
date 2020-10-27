import axios from "axios";

export const createChapter = (courseId, payload) => {
  return axios.post(`/api/v1/courses/${courseId}/chapters`, payload);
};

export const updateChapter = (courseId, chapterId, payload) => {
  return axios.patch(
    `/api/v1/courses/${courseId}/chapters/${chapterId}`,
    payload
  );
};

export const deleteChapter = (courseId, chapterId) => {
  return axios.delete(`/api/v1/courses/${courseId}/chapters/${chapterId}`);
};

export const fetchChapter = (courseId, chapterId) =>
  axios.get(`/api/v1/courses/${courseId}/chapters/${chapterId}`);
