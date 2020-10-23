import React, { useState } from "react";
import { Button } from "nitroui";
import Axios from "axios";

export default function LessonForm(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [lesson_type, setLessonType] = useState("youtube");
  const [content, setContent] = useState("");
  const [file, setFile] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    
    if(file && file.name) {
      formData.append("lesson[file]", file);
    }
    
    formData.append("lesson[name]", name);
    formData.append("lesson[lesson_type]", lesson_type);
    formData.append("lesson[content]", content);
    formData.append("lesson[description]", description);

    Axios.post(
      `/api/v1/chapters/${props.chapter.chapter.id}/lessons`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    ).then(() => {
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
        Chapter Name: {props.chapter.chapter.name}
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
        />
      )}
      {(lesson_type == "pdf" || lesson_type == "image") && (
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
          type="file"
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
