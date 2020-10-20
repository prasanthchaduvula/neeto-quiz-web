import React, { useState } from "react";
import { PageHeading } from "nitroui/layouts";
import { Button } from "nitroui";
import NewCoursePane from "./NewCoursePane";

export default function Course() {
  const [showNewCoursePane, setShowNewCoursePane] = useState(false);
  return (
    <div>
      <PageHeading
        title="Courses"
        rightButton={() => (
          <Button
            onClick={() => setShowNewCoursePane(true)}
            label="Add new course"
            icon="ri-add-line"
          />
        )}
      />
      <NewCoursePane
        showPane={showNewCoursePane}
        setShowPane={setShowNewCoursePane}
      />
    </div>
  );
}
