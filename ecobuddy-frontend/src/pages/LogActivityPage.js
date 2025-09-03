// src/pages/LogActivityPage.js
import React from "react";
import UploadActivityForm from "../components/UploadActivityForm";
import "../App.css";
import "../index.css";

export default function LogActivityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-50 to-pink-50 p-6 App">
      <h1 className="text-5xl font-extrabold text-center mb-8 shimmer">
        Log a New Activity
      </h1>

      <div className="flex justify-center">
        <UploadActivityForm />
      </div>
    </div>
  );
}
