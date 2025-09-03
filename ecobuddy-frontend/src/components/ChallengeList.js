// src/components/ChallengeList.js
import React, { useEffect, useState } from "react";

export default function ChallengeList({ userId }) {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/challenges")
      .then(res => res.json())
      .then(data => setChallenges(data));
  }, []);

  const joinChallenge = async (challenge_id) => {
    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("challenge_id", challenge_id);

    const res = await fetch("http://127.0.0.1:8000/join-challenge", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Available Challenges</h2>
      {challenges.map(ch => (
        <div key={ch.challenge_id} className="p-4 mb-3 bg-white shadow rounded-lg">
          <h3 className="font-semibold text-lg">{ch.name}</h3>
          <p className="text-gray-600">{ch.description}</p>
          <p className="text-sm text-gray-500">
            {ch.start_date} to {ch.end_date} | Reward: {ch.reward_points} pts
          </p>
          <button
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={() => joinChallenge(ch.challenge_id)}
          >
            Join Challenge
          </button>
        </div>
      ))}
    </div>
  );
}
