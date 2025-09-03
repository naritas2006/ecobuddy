// src/components/MyChallenges.js
import React, { useEffect, useState } from "react";

export default function MyChallenges({ userId }) {
  const [myChallenges, setMyChallenges] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/my-challenges/${userId}`)
      .then(res => res.json())
      .then(data => setMyChallenges(data));
  }, [userId]);

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">My Challenges</h2>
      {myChallenges.map(ch => (
        <div key={ch.challenge_id} className="p-4 mb-3 bg-white shadow rounded-lg">
          <h3 className="font-semibold text-lg">{ch.name}</h3>
          <p className="text-gray-600">{ch.description}</p>
          <p className="text-sm text-gray-500">
            Status: <span className={ch.status === "Completed" ? "text-green-600" : "text-yellow-600"}>{ch.status}</span> | 
            Points Earned: {ch.points_earned}
          </p>
        </div>
      ))}
    </div>
  );
}
