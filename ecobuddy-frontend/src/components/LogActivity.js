// src/components/LogActivity.js
import { useState, useEffect } from "react";

export default function LogActivity() {
  const [activity, setActivity] = useState("");
  const [distance, setDistance] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/activities")
      .then((res) => res.json())
      .then((data) => setActivities(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!activity) {
      setMessage("Please select an activity.");
      return;
    }

    const formData = new FormData();
    formData.append("user_id", 1);
    formData.append("category_id", 1);
    formData.append("description", activity);
    if (distance) formData.append("distance_km", distance);
    if (file) formData.append("file", file);

    try {
      const res = await fetch("http://127.0.0.1:8000/upload-activity", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setMessage(data.message || "Activity logged!");
      
      // Clear form after successful submission
      setActivity("");
      setDistance("");
      setFile(null);
    } catch (err) {
      console.error(err);
      setMessage("Error uploading activity.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Activity Form */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-2xl font-bold text-green-800 mb-4">Log New Activity</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Activity dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Activity
              </label>
              <select
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
              >
                <option value="">-- Choose an Activity --</option>
                {activities.map((a, i) => (
                  <option key={i} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>
  
            {/* Distance input for per-unit activities */}
            {(activity.includes("per km") ||
              activity.includes("per kWh") ||
              activity.includes("per bulb") ||
              activity.includes("per kg") ||
              activity.includes("per item")) && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Enter Quantity / Distance
                </label>
                <input
                  type="number"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Enter value (e.g. km, kg, items, bulbs)"
                  required
                />
              </div>
            )}
  
            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Describe your activity"
              />
            </div>
  
            {/* File upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Photo (optional)
              </label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full"
              />
            </div>
  
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Submit Activity
            </button>
          </form>
          {message && <p className="mt-4 text-center text-green-700">{message}</p>}
        </div>
  
        {/* Activities List */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-2xl font-bold text-green-800 mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div key={index} className="border rounded-lg p-4 hover:bg-green-50 transition">
                <h3 className="font-semibold text-lg text-green-700">{activity.description}</h3>
                <div className="mt-2 text-sm text-gray-600">
                  <p>Points Earned: {activity.points}</p>
                  <p>Carbon Offset: {activity.carbon_offset} kg</p>
                </div>
                {activity.photo && (
                  <img 
                    src={activity.photo} 
                    alt={activity.description}
                    className="mt-2 rounded-lg w-full h-32 object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
