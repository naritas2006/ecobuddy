// src/pages/ChallengesPage.jsx
import React, { useEffect, useState } from "react";

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState([]);
  const [userChallenges, setUserChallenges] = useState([]);
  const userId = 1; // replace with your logged-in user ID

  // Fetch all challenges and user's joined challenges
  useEffect(() => {
    // All challenges
    fetch("http://127.0.0.1:8000/challenges")
      .then((res) => res.json())
      .then((data) => setChallenges(data))
      .catch((err) => console.error("Error fetching challenges:", err));

    // User challenges
    fetch(`http://127.0.0.1:8000/user-challenges/${userId}`)
      .then((res) => res.json())
      .then((data) => setUserChallenges(data.map((c) => c.challenge_id)))
      .catch((err) => console.error("Error fetching user challenges:", err));
  }, []);

  // Join a challenge
  const joinChallenge = async (challengeId) => {
    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("challenge_id", challengeId);

    try {
      const res = await fetch("http://127.0.0.1:8000/join-challenge", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      alert(data.message);

      // Update local state
      setUserChallenges((prev) => [...prev, challengeId]);
    } catch (err) {
      console.error(err);
      alert("Failed to join challenge");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-4xl font-bold text-purple-700 mb-6">Challenges</h1>

      {challenges.length === 0 ? (
        <p>Loading challenges...</p>
      ) : (
        challenges.map((ch) => {
          const joined = userChallenges.includes(ch.challenge_id);
          return (
            <div
              key={ch.challenge_id}
              className="bg-white shadow-md rounded-xl p-5 mb-4 border"
            >
              <h2 className="text-2xl font-semibold">{ch.name}</h2>
              <p className="text-gray-700 mt-1">{ch.description}</p>
              <p className="text-gray-500 text-sm mt-1">
                Start: {ch.start_date} | End: {ch.end_date}
              </p>
              <p className="font-semibold mt-1">Reward: {ch.reward_points} pts</p>
              <button
                onClick={() => joinChallenge(ch.challenge_id)}
                disabled={joined}
                className={`mt-3 py-2 px-4 rounded font-bold text-white ${
                  joined
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-purple-500 hover:bg-purple-600 transition-colors"
                }`}
              >
                {joined ? "Joined" : "Join Challenge"}
              </button>
            </div>
          );
        })
      )}
    </div>
  );
}
