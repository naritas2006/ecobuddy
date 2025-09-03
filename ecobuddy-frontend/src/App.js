import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ChallengesPage from "./pages/ChallengesPage";
import LogActivityPage from "./pages/LogActivityPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/challenges" element={<ChallengesPage />} />
         <Route path="/log-activity" element={<LogActivityPage />} />
      </Routes>
    </Router>
  );
}

export default App;
