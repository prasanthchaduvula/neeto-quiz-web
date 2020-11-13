import React from "react";
import { Button } from "nitroui";
import { Input, Radio, Textarea } from "nitroui/formik";
import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { showToastr } from "common/index";
import { createLesson, updateLesson } from "apis/lessons";

export default function LessonForm({
  onClose,
  isCreateForm,
  chapter,
  lesson,
  fetchSingleCourse,
}) {
  const initialValues = {
    name: lesson.name || "",
    description: lesson.description || "",
    lesson_type: lesson.lesson_type || "youtube",
    content: lesson.content || "",
    pdf: lesson.file || "",
    image: lesson.file || "",
  };

  const IMAGE_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

  const validationSchema = yup.object().shape({
    name: yup.string().required("Required *"),
    lesson_type: yup.string().required("Required *"),
    content: yup.string().when("lesson_type", {
      is: "youtube",
      then: yup.string().required("Must enter youtube video url"),
    }),
    image: yup.mixed().when("lesson_type", {
      is: "image",
      then: yup
        .mixed()
        .required("A image file is required")
        .test(
          "fileFormat",
          "Unsupported Format (Must be png/jpg/jpeg/gif)",
          value => value && IMAGE_FORMATS.includes(value.type)
        ),
    }),
    pdf: yup.mixed().when("lesson_type", {
      is: "pdf",
      then: yup
        .mixed()
        .required("A pdf file is required")
        .test(
          "fileFormat",
          "Unsupported Format (Must be pdf)",
          value => value && ["application/pdf"].includes(value.type)
        ),
    }),
  });

  const handleSubmit = values => {
    const formData = new FormData();
    if (values.lesson_type == "youtube") {
      formData.append("lesson[content]", values.content);
    } else if (values.lesson_type == "pdf") {
      formData.append("lesson[file]", values.pdf);
    } else {
      formData.append("lesson[file]", values.image);
    }

    formData.append("lesson[name]", values.name);
    formData.append("lesson[lesson_type]", values.lesson_type);
    formData.append("lesson[description]", values.description);

    const sendRequest = payload => {
      return isCreateForm
        ? createLesson(chapter.id, payload)
        : updateLesson(chapter.id, payload, lesson.id);
    };

    sendRequest(formData).then(response => {
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
      {({ values, setFieldValue, handleSubmit }) => {
        return (
          <Form>
            <label
              className="block text-gray-700 text-sm font-bold"
              htmlor="name"
            >
              Chapter Name: {chapter.name}
            </label>
            <Input
              label="Name of the lesson"
              required
              name="name"
              className="mt-6"
            />
            <Textarea label="Description" name="description" className="mt-6" />
            <Radio
              className="mt-6"
              label="Choose lesson type:"
              required
              name="lesson_type"
              options={[
                {
                  label: "Youtube",
                  value: "youtube",
                },
                {
                  label: "Pdf",
                  value: "pdf",
                },
                {
                  label: "Image",
                  value: "image",
                },
              ]}
            />
            {values.lesson_type == "youtube" && (
              <Input
                name="content"
                className="mt-6"
                placeholder="Enter youtube video url"
              />
            )}
            {values.lesson_type == "pdf" && (
              <>
                <input
                  name="pdf"
                  type="file"
                  className="mt-6"
                  onChange={event => {
                    setFieldValue("pdf", event.currentTarget.files[0]);
                  }}
                />
                <ErrorMessage
                  name="pdf"
                  component="div"
                  className="text-red-600 mt-2"
                />
              </>
            )}

            {values.lesson_type == "image" && (
              <>
                <input
                  name="image"
                  type="file"
                  className="mt-6"
                  onChange={event => {
                    setFieldValue("image", event.currentTarget.files[0]);
                  }}
                />
                <ErrorMessage
                  name="image"
                  component="div"
                  className="text-red-600 mt-2"
                />
              </>
            )}
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
