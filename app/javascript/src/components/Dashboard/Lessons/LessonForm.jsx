import React, { useEffect } from "react";
import { Button } from "nitroui";
import { createLesson, updateLesson } from "../../../apis/lessons";
import { showToastr } from "../../../common/index";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

export default function LessonForm(props) {
  const initialValues = {
    name: "",
    description: "",
    lesson_type: "youtube",
    content: "",
    file: "",
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required("Required *"),
    lesson_type: yup.string().required("Required *"),
  });

  const validateContent = value => {
    let error;
    if (!value) {
      error = "Required";
    }
    return error;
  };

  props.isCreateForm
    ? null
    : useEffect(() => {
        initialValues.name = props.lesson.name;
        initialValues.description = props.lesson.description;
        initialValues.lesson_type = props.lesson.lesson_type;
        initialValues.content = props.lesson.content;
        initialValues.file = props.lesson.file;
      }, []);

  const handleSubmit = values => {
    const formData = new FormData();
    if (values.file && values.file.name) {
      formData.append("lesson[file]", values.file);
    }
    if (values.lesson_type == "youtube") {
      formData.append("lesson[content]", values.content);
    }
    formData.append("lesson[name]", values.name);
    formData.append("lesson[lesson_type]", values.lesson_type);
    formData.append("lesson[description]", values.description);

    const sendRequest = payload => {
      return props.isCreateForm
        ? createLesson(props.chapter.id, payload)
        : updateLesson(props.chapter.id, payload, props.lesson.id);
    };

    sendRequest(formData).then(response => {
      showToastr("success", response.data.notice);
      props.fetchSingleCourse();
      props.onClose();
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      {formik => {
        return (
          <Form>
            <label
              className="block text-gray-700 text-sm font-bold mb-4"
              htmlor="name"
            >
              Chapter Name: {props.chapter.name}
            </label>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlor="name"
              >
                Name of the lesson
              </label>
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-600"
              />
              <Field
                type="text"
                id="name"
                name="name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlor="description"
              >
                Description
              </label>
              <Field
                as="textarea"
                id="description"
                name="description"
                rows="5"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
              />
              <ErrorMessage name="description" />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlor="lesson_type"
              >
                Choose lesson type:
              </label>
              <Field name="lesson_type" as="select">
                <option value="youtube">Youtube</option>
                <option value="pdf">Pdf</option>
                <option value="image">Image</option>
              </Field>
              <ErrorMessage
                name="lesson_type"
                component="div"
                className="text-red-600"
              />
            </div>

            {formik.values.lesson_type == "youtube" ? (
              <div className="mb-4">
                <Field
                  type="text"
                  id="content"
                  name="content"
                  validate={validateContent}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                />
                <ErrorMessage
                  name="content"
                  component="div"
                  className="text-red-600"
                />
              </div>
            ) : (
              <div className="mb-4">
                <input
                  id="file"
                  name="file"
                  type="file"
                  required
                  onChange={event => {
                    formik.setFieldValue("file", event.currentTarget.files[0]);
                  }}
                />
                <ErrorMessage
                  name="file"
                  component="div"
                  className="text-red-600"
                />
              </div>
            )}

            <div className="absolute bottom-0 left-0 w-full bg-white nui-pane--footer">
              <Button
                onClick={props.onClose}
                label="Cancel"
                size="large"
                style="secondary"
              />

              <Button
                type="submit"
                label="Submit"
                size="large"
                style="primary"
                className="ml-2"
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
