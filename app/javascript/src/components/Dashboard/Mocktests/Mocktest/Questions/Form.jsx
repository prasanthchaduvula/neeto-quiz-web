import React, { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Button, Toastr, Callout } from "neetoui";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { createQuestion, updateQuestion } from "apis/questions";

export default function QuestionForm({
  onClose,
  isCreateForm,
  mocktestId,
  fetchSingleMocktest,
  question,
}) {
  const [initialValues, setInitialValues] = useState({
    description: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    correct_option: null,
  });

  useEffect(() => {
    loadQuestionDetails();
  }, []);

  const loadQuestionDetails = () => {
    question &&
      question.options.filter(
        (option, index) =>
          option.is_correct &&
          setInitialValues({
            ...initialValues,
            description: question.description,
            option1: question.options[0].name,
            option2: question.options[1].name,
            option3: question.options[2].name,
            option4: question.options[3].name,
            correct_option: index + 1,
          })
      );
  };

  const validationSchema = yup.object().shape({
    description: yup.string().required("Required *"),
    option1: yup.string().required("Required *"),
    option2: yup.string().required("Required *"),
    option3: yup.string().required("Required *"),
    option4: yup.string().required("Required *"),
    correct_option: yup
      .string()
      .required(
        "Correct option is required. Please select one option from the above as correct option"
      )
      .nullable(),
  });

  const handleSubmit = async values => {
    let { option1, option2, option3, option4, correct_option } = values;
    let options = [];

    if (isCreateForm) {
      options.push(
        { name: option1 },
        { name: option2 },
        { name: option3 },
        { name: option4 }
      );
    } else {
      options.push(
        { id: question.options[0].id, name: option1 },
        { id: question.options[1].id, name: option2 },
        { id: question.options[2].id, name: option3 },
        { id: question.options[3].id, name: option4 }
      );
    }

    options.map((option, index) => {
      if (index + 1 == correct_option) {
        option.is_correct = true;
      } else {
        option.is_correct = false;
      }
    });

    const payload = {
      question: {
        description: values.description,
        options_attributes: options,
      },
    };

    const sendRequest = payload => {
      return isCreateForm
        ? createQuestion(mocktestId, payload)
        : updateQuestion(mocktestId, payload, question.id);
    };

    let response = await sendRequest(payload);
    Toastr.success(response.data.notice);
    fetchSingleMocktest();
    onClose();
  };

  return (
    <Formik
      enableReinitialize
      validateOnBlur={false}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      {({ handleSubmit, isSubmitting, values, setFieldValue }) => {
        return (
          <Form>
            <div className="mb-6">
              <label htmlFor="Description" className="block mb-2">
                Question*
              </label>
              <TextareaAutosize
                name="description"
                value={values.description}
                minRows={3}
                className="border-2 rounded-md shadow-sm w-full focus:outline-none focus-within:shadow-focus-purple focus-within:border-purple-400 p-4"
                onChange={event => {
                  setFieldValue("description", event.target.value);
                }}
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-600 mt-2"
              />
            </div>

            <Callout style="info">
              Please select one option from below as correct option
            </Callout>

            <div className="py-10">
              {[1, 2, 3, 4].map(number => (
                <div className="flex flex-row items-center mb-10" key={number}>
                  <Field
                    type="radio"
                    name="correct_option"
                    value={number}
                    checked={values.correct_option == number}
                    className="form-radio"
                  />
                  <Field
                    type="text"
                    name={`option${number}`}
                    placeholder={`option ${number}`}
                    className="border-b w-4/5 ml-2 outline-none focus:border-black"
                  />
                  <ErrorMessage
                    name={`option${number}`}
                    component="div"
                    className="text-red-600 mt-2"
                  />
                </div>
              ))}
              <ErrorMessage
                name="correct_option"
                component="div"
                className="text-red-600 mt-2"
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
