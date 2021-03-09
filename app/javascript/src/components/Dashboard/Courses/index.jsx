import React, { useState, useEffect } from "react";
import { useAuthState } from "contexts/auth";
import { PageHeading } from "neetoui/layouts";
import { Button, PageLoader } from "neetoui";
import { getCourses } from "apis/courses";
import CoursePane from "./Course/Pane";
import ListCourses from "./ListCourses";
import JoinCoursePane from "./Join";
import { withRouter } from "react-router-dom";

function Courses() {
  const authState = useAuthState();
  const [coursePane, setCoursePane] = useState(false);
  const [courses, setCourses] = useState({});
  const [joinCoursePane, setJoinCoursePane] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    let response = await getCourses();
    setCourses(response.data.courses);
    setLoading(false);
  };

  return (
    <div>
      <PageHeading
        title="My Courses"
        rightButton={() => (
          <>
            {authState.authRole == "admin" ||
            authState.authRole == "instructor" ? (
              <Button
                label="Add new course"
                icon="ri-add-line"
                onClick={() => setCoursePane(true)}
              />
            ) : (
              <Button
                label="Join course"
                icon="ri-send-plane-line"
                onClick={() => setJoinCoursePane(true)}
              />
            )}
          </>
        )}
      />
      {loading ? (
        <div className="min-h-screen flex items-center">
          <PageLoader />
        </div>
      ) : (
        <ListCourses courses={courses} />
      )}
      <JoinCoursePane
        showPane={joinCoursePane}
        setShowPane={setJoinCoursePane}
      />

      <CoursePane
        showPane={coursePane}
        setShowPane={setCoursePane}
        isCreateForm={true}
        course=""
        fetchCourses={fetchCourses}
        setCourse=""
        creator=""
      />
    </div>
  );
}

export default withRouter(Courses);
