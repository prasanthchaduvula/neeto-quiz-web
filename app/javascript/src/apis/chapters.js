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

<<<<<<< HEAD
export const deleteChapter = (courseId, chapterId) => {
  return axios.delete(`/api/v1/courses/${courseId}/chapters/${chapterId}`);
=======
const deleteChapter = (courseId, chapterId) =>
  axios.delete(`/api/v1/courses/${courseId}/chapters/${chapterId}`);

export default {
  fetchChapter,
  createChapter,
  updateChapter,
  deleteChapter,
>>>>>>> chapter controller updated to include lessons in show and update action, made  chapter api routes, updated chapter form for edit chapter functionality, created editchapter sectionor pane, created show chapter component and completed functionality of chapter edit and delete, made minor ui changes to indivitualcourse component
};

export const fetchChapter = (courseId, chapterId) =>
  axios.get(`/api/v1/courses/${courseId}/chapters/${chapterId}`);
