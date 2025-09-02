// src/components/ActivityCard.js
import React from "react";

export default function ActivityCard({ activity }) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-4 hover:shadow-2xl transition-all duration-300">
      <img
        src={`http://127.0.0.1:8000/activity-photo/${activity.activity_id}`}
        alt="Activity"
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h2 className="text-xl font-bold mb-2">{activity.description}</h2>
      <p><span className="font-semibold">Activity ID:</span> {activity.activity_id}</p>
      <p><span className="font-semibold">User ID:</span> {activity.user_id}</p>
      <p><span className="font-semibold">Category ID:</span> {activity.category_id}</p>
      <p><span className="font-semibold">Points:</span> {activity.points}</p>
      <p><span className="font-semibold">Carbon Offset:</span> {activity.carbon_offset}</p>
    </div>
  );
}
