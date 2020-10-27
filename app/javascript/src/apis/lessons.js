import axios from "axios";

export const createLesson = (chapterId, payload) => {
  return axios.post(`/api/v1/chapters/${chapterId}/lessons`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateLesson = (chapterId, payload, lessonId) => {
  return axios.patch(
    `/api/v1/chapters/${chapterId}/lessons/${lessonId}`,
    payload,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};
