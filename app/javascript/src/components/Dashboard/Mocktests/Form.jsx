import React from "react";
import { Button, Toastr } from "neetoui";
import { Input } from "neetoui/formik";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { createMocktest } from "apis/mocktests";
import { updateMocktest } from "../../../apis/mocktests";
import { Link } from "react-router-dom";

export default function MocktestForm({
  onClose,
  isCreateForm,
  mocktest,
  fetchMocktests,
  creator,
  fetchSingleMocktest,
}) {
  const initialValues = {
    name: mocktest.name || "",
    price: mocktest.price || 0,
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required("Required *"),
    price: yup
      .number()
      .lessThan(100000, "must be less than 100000")
      .moreThan(-1, "Price should not be a negative number"),
  });

  const handleSubmit = async values => {
    const payload = {
      mocktest: {
        name: values.name,
        price: values.price || 0,
      },
    };

    const sendRequest = payload => {
      return isCreateForm
        ? createMocktest(payload)
        : updateMocktest(mocktest.id, payload);
    };

    let response = await sendRequest(payload);
    Toastr.success(response.data.notice);
    if (isCreateForm) {
      fetchMocktests();
    } else {
      fetchSingleMocktest();
    }
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
              label="Name of the mocktest"
              name="name"
              autoFocus
              required
              className="mb-6"
            />

            <Input
              label="Price of the mocktest in rupees"
              type="number"
              name="price"
              className="mb-6"
              disabled={creator && !creator.payment_details ? true : false}
            />
            {creator && !creator.payment_details && (
              <Link to="/profile?payment-details" className="text-indigo-600">
                To add price to the course. Please add bank acount details
              </Link>
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
