import React from "react";
import { Button } from "neetoui";
import { Input } from "neetoui/formik";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { Link, withRouter } from "react-router-dom";

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
    props.setLoading(true);
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
              label="Login"
              size="large"
              style="primary"
              fullWidth
              className="mt-6 text-center text-base font-medium"
              onClick={handleSubmit}
              loading={props.loading}
            />
            <div className="text-sm mt-6">
              <Link
                to="/signup"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Want to create an organization? please <strong>Signup</strong>
              </Link>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default withRouter(EnterPhoneNumber);
