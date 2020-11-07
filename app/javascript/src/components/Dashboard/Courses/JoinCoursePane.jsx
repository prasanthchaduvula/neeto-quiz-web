import React from "react";
import { Pane, Button } from "nitroui";
import { Input } from "nitroui/formik";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { showToastr } from "common";
import { getJoinCourse } from "apis/courses";

export default function JoinCoursePane({ setShowPane, showPane }) {
  const onClose = () => setShowPane(false);
  const initialValues = {
    invitation_code: "",
  };

  const validationSchema = yup.object().shape({
    invitation_code: yup.string().required("Required *"),
  });

  const handleSubmit = values => {
    getJoinCourse(values.invitation_code).then(response => {
      response.data.notice && showToastr("success", response.data.notice);
      onClose();
    });
  };

  return (
    <Pane title="Join Course" isOpen={showPane} onClose={onClose}>
      <div className="px-6">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          {({ handleSubmit }) => {
            return (
              <Form>
                <div className="mb-4">
                  <Input
                    label="Enter the course invitation code"
                    name="invitation_code"
                    autoFocus
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
                    onClick={handleSubmit}
                  />
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </Pane>
  );
}
