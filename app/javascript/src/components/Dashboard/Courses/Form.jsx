import React from "react";
import { Button } from "nitroui";
import { Input, Textarea } from "nitroui/formik";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { showToastr } from "common";
import { createCourse, updateCourse } from "apis/courses";

export default function CourseForm({
  onClose,
  isCreateForm,
  course,
  fetchCourses,
  setCourse,
}) {
  const initialValues = {
    name: course.name || "",
    description: course.description || "",
    price: course.price || "",
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required("Required *"),
    description: yup.string().required("Required *"),
    price: yup
      .number()
      .lessThan(100000, "must be less than 100000")
      .moreThan(-1, "Price should not be a negative number"),
  });

  const handleSubmit = values => {
    const payload = {
      course: {
        name: values.name,
        description: values.description,
        price: values.price,
      },
    };

    const sendRequest = payload => {
      return isCreateForm
        ? createCourse(payload)
        : updateCourse(course.id, payload);
    };

    sendRequest(payload).then(response => {
      showToastr("success", response.data.notice);
      if (isCreateForm) {
        fetchCourses();
      } else {
        setCourse(response.data.course);
      }
      onClose();
    });
  };

  return (
    <Formik
      validateOnBlur={false}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      {({ handleSubmit }) => {
        return (
          <Form>
            <Input
              label="Name of the course"
              name="name"
              autoFocus
              required
              className="mb-6"
            />
            <Textarea
              label="Description"
              name="description"
              required
              className="mb-6"
            />
            <Input
              label="Price of the course in rupees"
              type="number"
              name="price"
              className="mb-6"
            />

            <div className="absolute bottom-0 left-0 w-full bg-white nui-pane--footer">
              <Button
                onClick={onClose}
                label="Cancel"
                size="large"
                style="secondary"
              />
              <Button
                label="Submit"
                size="large"
                style="primary"
                className="ml-2"
                onClick={handleSubmit}
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
