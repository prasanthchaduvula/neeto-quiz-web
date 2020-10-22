import React, { useEffect, useState } from "react";
import { Button } from "nitroui";
import ChapterApi from "../../../../apis/chapters";
export default function ChapterForm(props) {
  const [name, setName] = useState("");

  props.isCreateForm
    ? null
    : useEffect(() => {
        setName(props.chapterName);
      }, [props.chapterName]);

  const handleSubmit = e => {
    e.preventDefault();
    const payload = {
      chapter: {
        name,
      },
    };
    const sendRequest = payload => {
      return props.isCreateForm
        ? ChapterApi.createChapter(props.courseId, payload)
        : ChapterApi.updateChapter(props.courseId, payload);
    };
    sendRequest(payload).then(response => {
      if (props.isCreateForm) {
        props.refetch();
        props.onClose();
      } else {
        props.setCourse(response.data.course_details);
        props.onClose();
      }
    });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlor="name"
        >
          Name of the Chapter
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Name"
          onChange={e => setName(e.target.value)}
          value={name}
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
    </form>
  );
}
