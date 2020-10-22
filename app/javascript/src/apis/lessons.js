import axios from "axios";

const fetchChapterLessons = chapterId => {
  return axios.get(`api/v1/chapters/${chapterId}/lessons`);
};

export default { fetchChapterLessons };
