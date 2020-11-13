import React from "react";
import { Button } from "nitroui";
import { Input } from "nitroui/formik";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { showToastr } from "common";
import { getJoinCourse } from "apis/courses";

export default function InvitationForm({
  onClose,
  setInvitationForm,
  setCourse,
  setChapters,
}) {
  const initialValues = {
    invitation_code: "",
  };

  const validationSchema = yup.object().shape({
    invitation_code: yup.string().required("Required *"),
  });

  const handleSubmit = values => {
    getJoinCourse(values.invitation_code).then(response => {
      const { notice, course, chapters } = response.data;
      if (notice) {
        showToastr("success", notice);
        onClose();
      } else {
        setInvitationForm(false);
        setCourse(course);
        setChapters(chapters);
      }
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
      {({ handleSubmit }) => {
        return (
          <div className="px-6">
            <Form>
              <Input
                label="Enter the course invitation code"
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
                  onClick={handleSubmit}
                />
              </div>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
}
