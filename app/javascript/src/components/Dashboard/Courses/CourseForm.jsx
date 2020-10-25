import React from "react";
import { Button } from "nitroui";
import { createCourse, updateCourse } from "../../../apis/courses";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { showToastr } from "../../../common";

export default function CourseForm(props) {
  const initialValues = {
    name: "",
    description: "",
    price: "",
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required("Required *"),
    description: yup.string().required("Required *"),
  });

  // props.isCreateForm
  //   ? null
  //   : useEffect(() => {
  //       setName(props.courseName);
  //       setDescription(props.courseDescription);
  //     }, [props.courseName, props.courseDescription]);

  const handleSubmit = values => {
    const payload = {
      course: {
        name: values.name,
        description: values.description,
        price: values.price,
      },
    };
    const sendRequest = payload => {
      return props.courseId
        ? updateCourse(props.courseId, payload)
        : createCourse(payload);
    };

    sendRequest(payload).then(response => {
      showToastr("success", response.data.notice);
      props.refetch();
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
      <Form>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlor="name"
          >
            Name of the course
          </label>
          <ErrorMessage name="name" component="div" className="text-red-600" />
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
          <ErrorMessage
            name="description"
            component="div"
            className="text-red-600"
          />
          <Field
            as="textarea"
            id="description"
            name="description"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlor="price"
          >
            Price
          </label>
          <Field
            type="number"
            id="price"
            name="price"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
          />
        </div>

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
    </Formik>
  );
}
