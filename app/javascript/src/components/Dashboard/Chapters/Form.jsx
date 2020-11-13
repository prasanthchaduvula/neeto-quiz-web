import React from "react";
import { Button } from "nitroui";
import { Input } from "nitroui/formik";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { showToastr } from "common";
import { createChapter, updateChapter } from "apis/chapters";

export default function ChapterForm({
  onClose,
  isCreateForm,
  course,
  chapter,
  fetchSingleCourse,
}) {
  const initialValues = {
    name: chapter.name || "",
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required("Required *"),
  });

  const handleSubmit = values => {
    const payload = {
      chapter: {
        name: values.name,
      },
    };
    const sendRequest = payload => {
      return isCreateForm
        ? createChapter(course.id, payload)
        : updateChapter(course.id, chapter.id, payload);
    };

    sendRequest(payload).then(response => {
      showToastr("success", response.data.notice);
      fetchSingleCourse();
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
              label="Name of the chapter"
              name="name"
              autoFocus
              required
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
