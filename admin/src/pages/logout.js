import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout"); // Backend logout API clears cookies
      navigate("/login"); // Redirect to login page
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
};

export default DashboardLayout;
