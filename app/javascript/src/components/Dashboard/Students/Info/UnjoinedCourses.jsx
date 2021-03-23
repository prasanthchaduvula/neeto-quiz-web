import React, { useEffect, useState } from "react";
import { Button, PageLoader, Switch, Toastr } from "neetoui";
import { getUnjoinedCourses } from "apis/students";
import { addStudent } from "apis/courses";
import Search from "shared/Search";

function UnjoinedCourses({ student, setPaneMode, setPaneTitle }) {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    let response = await getUnjoinedCourses(student.id);
    setCourses(response.data.courses);
    setLoading(false);
  };

  const addStudentToCourse = async courseId => {
    const payload = {
      phone_number: student.phone_number,
      is_paid: true,
    };

    let response = await addStudent(courseId, payload);
    Toastr.success(response.data.notice);
    loadCourses();
  };

  const CourseBlock = ({ name, id }) => {
    return (
      <div className="flex justify-between mt-6 bg-white rounded-lg shadow px-5 py-4 hover:shadow-md">
        <p className="text-base font-normal text-black truncate">{name}</p>
        <Switch onChange={() => addStudentToCourse(id)} />
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center">
        <PageLoader />
      </div>
    );
  }

  return (
    <div>
      <div className="mt-4 pb-20">
        {courses && courses.length ? (
          <>
            <Search searchValue={searchValue} setSearchValue={setSearchValue} />
            {searchValue
              ? courses.map(
                  ({ course }) =>
                    course.name.toLowerCase().includes(searchValue) && (
                      <CourseBlock
                        key={course.id}
                        name={course.name}
                        id={course.id}
                      />
                    )
                )
              : courses.map(({ course }) => (
                  <CourseBlock
                    key={course.id}
                    name={course.name}
                    id={course.id}
                  />
                ))}
          </>
        ) : (
          <p className="text-center mt-20 text-base font-normal text-gray-900 truncate ">
            Student already joined all the published courses of this
            organization
          </p>
        )}
      </div>
      <div className="absolute bottom-0 left-0 w-full bg-white nui-pane--footer">
        <Button
          label="Go Back To Info"
          icon="ri-book-open-line"
          size="large"
          style="secondary"
          onClick={() => {
            setPaneMode("info");
            setPaneTitle("Info");
          }}
        />
      </div>
    </div>
  );
}

export default UnjoinedCourses;
