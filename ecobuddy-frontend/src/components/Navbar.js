import React from "react";

export default function Navbar() {
  return (
    <nav className="bg-green-500 p-4 text-white flex justify-between">
      <h1 className="text-xl font-bold">EcoBuddy</h1>
      <div>
        <button className="mr-4 hover:underline">Dashboard</button>
        <button className="hover:underline">Challenges</button>
      </div>
    </nav>
  );
}
