import React, { useEffect, useState } from "react";
import { Button } from "nitroui";
import { createLesson, updateLesson } from "../../../apis/lessons";
import { showToastr } from "../../../common/index";

export default function LessonForm(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [lesson_type, setLessonType] = useState("youtube");
  const [content, setContent] = useState("");
  const [file, setFile] = useState("");

  props.isCreateForm
    ? null
    : useEffect(() => {
        setName(props.lesson.name);
        setDescription(props.lesson.description);
        setLessonType(props.lesson.lesson_type);
        setContent(props.lesson.content);
        setFile(props.lesson.file);
      }, []);

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    if (file && file.name) {
      formData.append("lesson[file]", file);
    }
    if (lesson_type == "youtube") {
      formData.append("lesson[content]", content);
    }
    formData.append("lesson[name]", name);
    formData.append("lesson[lesson_type]", lesson_type);
    formData.append("lesson[description]", description);

    const sendRequest = payload => {
      return props.isCreateForm
        ? createLesson(props.chapter.id, payload)
        : updateLesson(props.chapter.id, payload, props.lesson.id);
    };
    sendRequest(formData).then(response => {
      showToastr("success", response.data.notice);
      props.fetchSingleCourse();
      props.onClose();
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <label
        className="block text-gray-700 text-sm font-bold mb-4"
        htmlor="name"
      >
        Chapter Name: {props.chapter.name}
      </label>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlor="name"
        >
          Name of the lesson
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Name"
          onChange={e => setName(e.target.value)}
          value={name}
          required
        />
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Description"
          rows="5"
          onChange={e => setDescription(e.target.value)}
          value={description}
        />
      </div>
      <div className="mb-2">
        <label
          className="text-gray-700 text-sm font-bold mb-2 mr-2"
          htmlFor="lesson_type"
        >
          Choose lesson type:
        </label>
        <select
          value={lesson_type}
          onChange={e => setLessonType(e.target.value)}
          required
        >
          <option value="youtube">Youtube</option>
          <option value="pdf">Pdf</option>
          <option value="image">Image</option>
        </select>
      </div>
      {lesson_type == "youtube" && (
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
          type="text"
          placeholder="Youtube video link"
          onChange={e => setContent(e.target.value)}
          value={content}
          required
        />
      )}
      {(lesson_type == "pdf" || lesson_type == "image") && (
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
          type="file"
          required
          onChange={e => setFile(e.target.files[0])}
        />
      )}
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
