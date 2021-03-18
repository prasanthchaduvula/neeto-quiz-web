import React, { useEffect, useState } from "react";
import { PageLoader } from "neetoui";
import { getCourse } from "apis/courses";
import PageNotFound from "shared/PageNotFound";
import CourseTemplate from "./Template";
import CourseDisplayForCreator from "./CourseDisplayForCreator";

export default function Course({ history, match }) {
  const [course, setCourse] = useState({});
  const [chapters, setChapters] = useState({});
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreator, setIsCreator] = useState(false);
  const [isStudent, setIsStudent] = useState(false);

  useEffect(() => {
    fetchSingleCourse();
  }, []);

  const fetchSingleCourse = () => {
    getCourse(match.params.course_id).then(response => {
      const {
        isCreator,
        isStudent,
        course,
        chapters,
        students,
      } = response.data;
      setCourse(course);
      setChapters(chapters);
      setStudents(students);
      setIsCreator(isCreator);
      setIsStudent(isStudent);
      setLoading(false);
    });
  };

  if (loading) {
    return <PageLoader />;
  } else if (isCreator) {
    return (
      <CourseDisplayForCreator
        course={course}
        chapters={chapters}
        fetchSingleCourse={fetchSingleCourse}
        students={students}
        history={history}
      />
    );
  } else if (isStudent) {
    return (
      <CourseTemplate isStudent={true} courseId={match.params.course_id} />
    );
  } else {
    return <PageNotFound />;
  }
}
