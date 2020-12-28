import React from "react";
import { Button, Toastr } from "neetoui";
import { Input } from "neetoui/formik";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { getJoinMocktest } from "apis/mocktests";

function InvitationForm({ onClose, setInvitationForm, setMocktest }) {
  const initialValues = {
    invitation_code: "",
  };

  const validationSchema = yup.object().shape({
    invitation_code: yup.string().required("Required *"),
  });

  const handleSubmit = async values => {
    let response = await getJoinMocktest(values.invitation_code);
    const { notice, mocktest } = response.data;
    if (notice) {
      Toastr.success(notice);
      onClose();
    } else {
      setInvitationForm(false);
      setMocktest(mocktest);
    }
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
              label="Enter the mocktest invitation code"
              name="invitation_code"
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

export default InvitationForm;
