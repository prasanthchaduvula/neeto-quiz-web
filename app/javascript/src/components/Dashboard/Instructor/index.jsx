import React, { useEffect, useState } from "react";
import { PageHeading } from "neetoui/layouts";
import { PageLoader, Callout } from "neetoui";
import { withRouter } from "react-router-dom";
import { getInstructor } from "apis/instructors";
import ListCourses from "../Courses/Explore/ListCourses";

function Instructor({ match }) {
  const [instructor, setInstructor] = useState({});
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchInstructor();
  }, []);

  const fetchInstructor = () => {
    getInstructor(match.params.id).then(response => {
      setInstructor(response.data.instructor);
      setCourses(response.data.courses);
      setIsLoading(false);
    });
  };

  return (
    <>
      {isLoading ? (
        <div className="min-h-screen flex items-center">
          <PageLoader />
        </div>
      ) : (
        <>
          <PageHeading title={`Instructor: ${instructor.name}`} />
          {courses && (
            <Callout style="info">
              Showing all the published courses by this instructor
            </Callout>
          )}
          <ListCourses courses={courses} />
        </>
      )}
    </>
  );
}

export default withRouter(Instructor);
