import React, { useEffect } from "react";
import { Button } from "nitroui";
import { Formik, Form, Field, ErrorMessage } from "formik";
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
  // const [initialValues, setInitialValues] = useState({});

  const initialValues = {
    name: "",
  };

  const loadIntialValues = () => {
    initialValues.name = chapter.name;
    // setInitialValues({ ...initialValues, name: chapter.name });
  };

  useEffect(() => {
    if (!isCreateForm) loadIntialValues();
  }, []);

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
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <Form>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlor="name"
          >
            Name of the chapter
          </label>
          <ErrorMessage name="name" component="div" className="text-red-600" />
          <Field
            type="text"
            id="name"
            name="name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
          />
        </div>

        <div className="absolute bottom-0 left-0 w-full bg-white nui-pane--footer">
          <Button
            onClick={onClose}
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
    </Formik>
  );
}
