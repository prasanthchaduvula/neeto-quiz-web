import React from "react";
import { Button, Toastr } from "neetoui";
import { Input } from "neetoui/formik";
import { Formik, Form } from "formik";
import * as yup from "yup";
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

  const handleSubmit = async values => {
    let response = await getJoinCourse(values.invitation_code);
    const { notice, course, chapters } = response.data;
    if (notice) {
      Toastr.success(notice);
      onClose();
    } else {
      setInvitationForm(false);
      setCourse(course);
      setChapters(chapters);
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
                  loading={isSubmitting}
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
