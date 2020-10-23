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

// const createLesson = (chapterId, payload) => {
//   const token = JSON.parse(localStorage.getItem("authToken"));
//   const phone = JSON.parse(localStorage.getItem("authPhone"));
//   fetch(`/api/v1/chapters/${chapterId}/lessons`,
//   {
//     method: 'POST',
//     headers: {
//       "Content-Type": "multipart/form-data",
//       "X-Auth-Phone": phone,
//       "X-Auth-Token": token
//     },
//     body: payload
//   }
//   ).then(res => res.json()).then( console.log(res) )
// }

export default { fetchChapterLessons, createLesson };
