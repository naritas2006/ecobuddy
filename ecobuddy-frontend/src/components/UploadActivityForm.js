// src/components/UploadActivityForm.js
import React, { useState } from "react";

export default function UploadActivityForm() {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState(0);
  const [carbonOffset, setCarbonOffset] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("user_id", 1);
    formData.append("category_id", 1);
    formData.append("description", description);
    formData.append("points", points);
    formData.append("carbon_offset", carbonOffset);
    formData.append("file", file);

    const res = await fetch("http://127.0.0.1:8000/upload-activity", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md mx-auto mb-8"
    >
      <h2 className="text-2xl font-bold mb-4 text-purple-700">Log New Activity</h2>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-3 p-2 border rounded w-full"
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="mb-3 p-2 border rounded w-full"
      />
      <input
        type="number"
        placeholder="Points"
        value={points}
        onChange={(e) => setPoints(e.target.value)}
        className="mb-3 p-2 border rounded w-full"
      />
      <input
        type="number"
        placeholder="Carbon Offset"
        value={carbonOffset}
        onChange={(e) => setCarbonOffset(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-xl font-bold hover:from-pink-500 hover:to-purple-500 transition-colors"
      >
        Upload
      </button>
    </form>
  );
}
