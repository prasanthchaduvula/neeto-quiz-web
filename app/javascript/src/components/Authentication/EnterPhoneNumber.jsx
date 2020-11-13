import React from "react";
import { Button } from "nitroui";
import { Input } from "nitroui/formik";
import { Formik, Form } from "formik";
import * as yup from "yup";

function EnterPhoneNumber(props) {
  const initialValues = {
    phone_number: props.phoneNumber,
  };

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = yup.object().shape({
    phone_number: yup
      .string()
      .required("Required *")
      .matches(phoneRegExp, "Phone number is not valid")
      .length(10, "Phone number must be 10 digits"),
  });

  const handleSubmit = values => {
    props.handlePhoneSubmit(values.phone_number);
  };

  return (
    <Formik
      validateOnBlur={false}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => {
        return (
          <Form>
            <Input
              label="Phone Number"
              type="number"
              name="phone_number"
              autoFocus
              prefix="+91"
              placeholder="Enter phone number"
            />

            <Button
              label="Submit"
              size="large"
              style="primary"
              fullWidth
              className="mt-6 text-center text-base font-medium"
              onClick={handleSubmit}
            />
          </Form>
        );
      }}
    </Formik>
  );
}

export default EnterPhoneNumber;
