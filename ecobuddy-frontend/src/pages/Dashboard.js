// src/pages/Dashboard.js
import React, { useEffect, useState } from "react";
import ActivityCard from "../components/ActivityCard";
import "../App.css";
import "../index.css";

export default function Dashboard() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Fetch user's activities (user_id = 1 for now)
    fetch("http://127.0.0.1:8000/user-activities/1")
      .then(res => res.json())
      .then(data => setActivities(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-50 to-pink-50 p-6 App">
      <h1 className="text-5xl font-extrabold text-center mb-8 shimmer">
        EcoBuddy Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.length === 0 ? (
          <p className="text-center col-span-full text-gray-500 text-xl">
            No activities yet. Start adding some eco-friendly actions!
          </p>
        ) : (
          activities.map(act => (
            <ActivityCard key={act.activity_id} activity={act} />
          ))
        )}
      </div>
    </div>
  );
}
