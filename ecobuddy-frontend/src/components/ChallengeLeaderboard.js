// src/components/ChallengeLeaderboard.js
import React, { useEffect, useState } from "react";

export default function ChallengeLeaderboard({ challengeId }) {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/challenge-leaderboard/${challengeId}`)
      .then(res => res.json())
      .then(data => setLeaderboard(data));
  }, [challengeId]);

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b">
            <th className="py-2">Rank</th>
            <th className="py-2">User</th>
            <th className="py-2">Points</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((user, idx) => (
            <tr key={user.user_id} className="border-b">
              <td className="py-2">{idx + 1}</td>
              <td className="py-2">{user.name}</td>
              <td className="py-2">{user.points_earned}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
