import React, { useEffect, useState } from "react";
import { PageLoader } from "neetoui";
import { exploreCourses } from "apis/courses";
import ListCourses from "./ListCourses";
import { withRouter } from "react-router-dom";

function ExploreCourses() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchExploreCourses();
  }, []);

  const fetchExploreCourses = () => {
    exploreCourses().then(response => {
      setCourses(response.data.courses);
      setIsLoading(false);
    });
  };

  return (
    <div>
      {isLoading ? (
        <div className="min-h-screen flex items-center">
          <PageLoader />
        </div>
      ) : (
        <ListCourses courses={courses} />
      )}
    </div>
  );
}

export default withRouter(ExploreCourses);