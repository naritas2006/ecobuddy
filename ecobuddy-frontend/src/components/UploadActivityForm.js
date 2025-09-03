import React, { useState, useEffect } from "react";

export default function UploadActivityForm() {
  const [activities, setActivities] = useState([]);
  const [activityName, setActivityName] = useState("");
  const [distance, setDistance] = useState(1);
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [challenges, setChallenges] = useState([]); // ✅ active challenges

  const userId = 1; // hardcoded for now, replace with logged-in user ID

  // ✅ Fetch activities from backend
  useEffect(() => {
    fetch("http://127.0.0.1:8000/activity-options")
      .then((res) => res.json())
      .then((data) => setActivities(data))
      .catch((err) => console.error("Failed to fetch activities:", err));
  }, []);

  // ✅ Fetch active challenges for the user
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/user-challenges/${userId}`)
      .then((res) => res.json())
      .then((data) => setChallenges(data))
      .catch((err) => console.error("Failed to fetch user challenges:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("category_id", 1);
    formData.append("activity_name", activityName);
    formData.append("distance", distance);
    formData.append("description", description);
    if (file) formData.append("file", file);

    const res = await fetch("http://127.0.0.1:8000/upload-activity", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    alert(data.message || "Activity uploaded!");

    // ✅ Refresh challenges to reflect updated points
    fetch(`http://127.0.0.1:8000/user-challenges/${userId}`)
      .then((res) => res.json())
      .then((data) => setChallenges(data))
      .catch((err) => console.error("Failed to fetch user challenges:", err));
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md mx-auto mb-8"
      >
        <h2 className="text-2xl font-bold mb-4 text-purple-700">
          Log New Activity
        </h2>

        {/* Activity Dropdown */}
        <select
          value={activityName}
          onChange={(e) => setActivityName(e.target.value)}
          required
          className="mb-3 p-2 border rounded w-full"
        >
          <option value="">Select Activity</option>
          {activities.map((act, idx) => (
            <option key={idx} value={act}>
              {act}
            </option>
          ))}
        </select>

        {/* Distance input */}
        <input
          type="number"
          placeholder="Distance/Quantity (default 1)"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          className="mb-3 p-2 border rounded w-full"
          min="0"
        />

        {/* Optional description */}
        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mb-3 p-2 border rounded w-full"
        />

        {/* Optional photo */}
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-4 p-2 border rounded w-full"
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-xl font-bold hover:from-pink-500 hover:to-purple-500 transition-colors"
        >
          Upload
        </button>
      </form>

      {/* ✅ Show user's active challenges and points */}
      {challenges.length > 0 && (
        <div className="bg-white shadow-md rounded-xl p-4 w-full max-w-md mx-auto">
          <h3 className="text-xl font-semibold mb-2 text-purple-700">
            Active Challenges
          </h3>
          <ul>
            {challenges.map((ch) => (
              <li key={ch.challenge_id} className="mb-1">
                <span className="font-bold">{ch.name}</span> - Points:{" "}
                {ch.points_earned || 0}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
