import axios from "axios";

const fetchChapterLessons = chapterId => {
  return axios.get(`api/v1/chapters/${chapterId}/lessons`);
};

export const createLesson = (chapterId, payload) =>
  axios.post(`/api/v1/chapters/${chapterId}/lessons`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateLesson = (chapterId, payload, lessonId) =>
  axios.patch(`/api/v1/chapters/${chapterId}/lessons/${lessonId}`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export default { fetchChapterLessons, createLesson };
