import React from "react";
import { Button, Toastr } from "neetoui";
import { Input } from "neetoui/formik";
import { Formik, Form } from "formik";
import * as yup from "yup";
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

  const handleSubmit = async values => {
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

    let response = await sendRequest(payload);
    Toastr.success(response.data.notice);
    fetchSingleCourse();
    onClose();
  };

  return (
    <Formik
      validateOnBlur={false}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      {({ handleSubmit, isSubmitting }) => {
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
                loading={isSubmitting}
                onClick={handleSubmit}
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
