import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import StepCard from "../components/StepCard";
import { useEffect, useState } from "react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function Home() {
  const navigate = useNavigate();
  const [challenges, setChallenges] = useState([]);

  // Fetch challenges for preview
  useEffect(() => {
    fetch("http://127.0.0.1:8000/challenges")
      .then((res) => res.json())
      .then((data) => setChallenges(data.slice(0, 3))) // show top 3
      .catch((err) => console.error("Failed to fetch challenges:", err));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-green-200 via-green-300 to-green-400 text-green-900 font-sans">
      {/* Hero Section */}
      <section className="text-center mt-12 space-y-6 px-4 max-w-xl mx-auto">
        <motion.h1
          className="text-5xl md:text-6xl font-bold shimmer"
          {...fadeIn}
        >
          EcoBuddy
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Track your eco-friendly activities, earn points, and see your carbon impact!
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-4 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-3 bg-green-700 text-white rounded-2xl font-semibold hover:brightness-110 transition"
          >
            View Dashboard
          </button>
          <button
            onClick={() => navigate("/log-activity")}
            className="px-6 py-3 border border-green-700 text-green-700 rounded-2xl font-semibold hover:bg-green-700 hover:text-white transition"
          >
            Log New Activity
          </button>
        </motion.div>
      </section>

      {/* Stats Section */}
      <motion.section
        className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4"
        {...fadeIn}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <StatCard label="Total Activities" value="23" />
        <StatCard label="Total Points Earned" value="142" />
        <StatCard label="Carbon Offset (kg)" value="87.5" />
      </motion.section>

      {/* How It Works */}
      <motion.section
        className="mt-28 max-w-6xl mx-auto text-center px-4"
        {...fadeIn}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-2xl font-semibold mb-8">How It Works</h3>
        <div className="flex flex-wrap justify-center gap-8">
          <StepCard
            tag="LOG"
            title="Log Activity"
            icon="🌱"
            desc="Record your eco-friendly actions like planting trees or recycling."
            bgColor="bg-green-300"
          />
          <StepCard
            tag="EARN"
            title="Earn Points"
            icon="💎"
            desc="Earn points and track your progress over time."
            bgColor="bg-green-500"
          />
          <StepCard
            tag="IMPACT"
            title="Track Impact"
            icon="🌍"
            desc="See how your actions contribute to reducing carbon emissions."
            bgColor="bg-green-400"
          />
        </div>
      </motion.section>

      {/* Challenges Preview */}
      <motion.section
        className="mt-24 max-w-6xl mx-auto px-4"
        {...fadeIn}
      >
        <h3 className="text-2xl font-semibold mb-6">Active Challenges</h3>
        {challenges.length === 0 ? (
          <p>Loading challenges...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {challenges.map((ch) => (
              <motion.div
                key={ch.challenge_id}
                whileHover={{ scale: 1.03 }}
                className="bg-white shadow-md rounded-xl p-5 border cursor-pointer"
                onClick={() => navigate("/challenges")}
              >
                <h4 className="font-semibold text-lg">{ch.name}</h4>
                <p className="text-gray-700 mt-1">{ch.description}</p>
                <p className="text-gray-500 text-sm mt-1">
                  {ch.start_date} → {ch.end_date}
                </p>
                <p className="font-semibold mt-1">Reward: {ch.reward_points} pts</p>
              </motion.div>
            ))}
          </div>
        )}
      </motion.section>

      {/* Quick Links */}
      <motion.section
        className="mt-24 max-w-6xl mx-auto px-4"
        {...fadeIn}
      >
        <h3 className="text-2xl font-semibold mb-8">Quick Links</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <ToolCard label="Dashboard" onClick={() => navigate("/dashboard")} />
          <ToolCard label="Log Activity" onClick={() => navigate("/log-activity")} />
          <ToolCard label="Leaderboard" onClick={() => navigate("/leaderboard")} />
          <ToolCard label="Challenges" onClick={() => navigate("/challenges")} />
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="mt-24 py-12 text-center text-green-900 border-t border-green-700 text-sm bg-white bg-opacity-40 backdrop-blur-md w-full">
        Built with 💚 by Team EcoBuddy
      </footer>
    </div>
  );
}

// Reusable StatCard
function StatCard({ label, value }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white bg-opacity-50 backdrop-blur-lg border border-green-300 p-6 rounded-2xl shadow-md text-center"
    >
      <p className="text-sm">{label}</p>
      <p className="text-3xl font-bold">{value}</p>
    </motion.div>
  );
}

// Reusable ToolCard
function ToolCard({ label, onClick }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
      className="cursor-pointer bg-white bg-opacity-50 backdrop-blur-lg border border-green-300 p-6 rounded-xl text-center hover:shadow-xl transition"
    >
      <p className="text-lg font-semibold">{label}</p>
    </motion.div>
  );
}
